import time
import random
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pymongo import MongoClient

# --- Conexión MongoDB ---
client = MongoClient("mongodb://mongo:rVZolHXXNtxThXLAqHAGmUdZsWXNpDRn@ballast.proxy.rlwy.net:34206")
db = client["test"]
collection = db["hotels"]

# --- Configurar navegador ---
options = Options()
options.add_argument("--start-maximized")
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36")
driver = webdriver.Chrome(options=options)

# --- Lista de ciudades/pueblos de Colombia ---
ciudades_colombia = [
    "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga",
    "Santa Marta", "Cúcuta", "Pereira", "Manizales", "Villavicencio", "Neiva",
    "Armenia", "Ibagué", "Montería", "Sincelejo", "Popayán", "Tunja",
    "Riohacha", "Quibdó", "Yopal", "San Andrés", "Leticia", "Florencia"
]

checkin = "2026-06-15"
checkout = "2026-06-17"

try:
    for ciudad in ciudades_colombia:
        print(f"\n🌍 Scrapeando ciudad: {ciudad}")
        ciudad_url = ciudad.replace(" ", "-")
        search_url = f"https://www.airbnb.com.co/s/{ciudad_url}--Colombia/homes"
        driver.get(search_url)

        # Cierra pop-up de traducción si aparece
        try:
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.XPATH, "//div[contains(text(),'Traducción activada')]"))
            )
            cerrar_btn = driver.find_element(By.XPATH, "//button[contains(@aria-label,'Cerrar')]")
            cerrar_btn.click()
            print("✅ Pop-up cerrado")
        except TimeoutException:
            pass

        # Scroll para cargar más resultados
        for _ in range(5):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(random.uniform(2.0, 3.5))

        alojamientos = driver.find_elements(By.XPATH, "//a[contains(@href,'/rooms/')]")
        links = list({elem.get_attribute("href").split("?")[0] for elem in alojamientos})
        print(f"📌 {len(links)} alojamientos encontrados en {ciudad}")

        for link in links:
            alojamiento_url = f"{link}?check_in={checkin}&check_out={checkout}&adults=1"
            driver.get(alojamiento_url)
            time.sleep(random.uniform(4.0, 6.0))

            try:
                # Cierra pop-up si reaparece
                try:
                    WebDriverWait(driver, 5).until(
                        EC.presence_of_element_located((By.XPATH, "//div[contains(text(),'Traducción activada')]"))
                    )
                    cerrar_btn = driver.find_element(By.XPATH, "//button[contains(@aria-label,'Cerrar')]")
                    cerrar_btn.click()
                    print("✅ Pop-up cerrado nuevamente")
                except TimeoutException:
                    pass

                # Título del alojamiento
                titulo = driver.find_element(By.TAG_NAME, "h1").text

                # Precio del alojamiento
                precio_span = None
                clases_precio = ["umg93v9", "umuerxh"]
                for clase in clases_precio:
                    try:
                        precio_span = driver.find_element(By.XPATH, f"//span[contains(@class, '{clase}')]")
                        if precio_span:
                            break
                    except NoSuchElementException:
                        continue

                if not precio_span:
                    raise Exception("No se encontró el precio")

                precio = precio_span.text.strip().replace("\u202f", " ").replace(u'\xa0', ' ')
                print(f"✅ {titulo} — {precio}")

                # Guardar en MongoDB
                collection.insert_one({
                    "titulo": titulo,
                    "precio": precio,
                    "url": link,
                    "ciudad": ciudad,
                    "check_in": checkin,
                    "check_out": checkout,
                    "fecha_scraping": datetime.now()
                })
                print(f"💾 Guardado en MongoDB: {titulo}")

            except Exception as e:
                print(f"❌ Error procesando {link} — {str(e)}")
            time.sleep(random.uniform(1.5, 2.5))  # pausa entre alojamientos

except Exception as general_error:
    print(f"⚠️ Error general: {general_error}")

finally:
    driver.quit()
    print("\n🔚 Proceso de scraping finalizado.")
