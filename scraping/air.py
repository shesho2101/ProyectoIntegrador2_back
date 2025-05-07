import time, re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from pymongo import MongoClient

# MongoDB
client = MongoClient("mongodb://mongo:rVZolHXXNtxThXLAqHAGmUdZsWXNpDRn@ballast.proxy.rlwy.net:34206")
db = client["test"]
collection = db["hotels"]

# Navegador
options = Options()
options.add_argument("--start-maximized")
driver = webdriver.Chrome(options=options)

ciudades = [
    "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Cúcuta", 
    "Bucaramanga", "Pereira", "Manizales", "Santa Marta", "Ibagué", 
    "Neiva", "Villavicencio", "Popayán", "Armenia", "Montería", 
    "Sincelejo", "Valledupar", "Tunja", "Riohacha", "Risaralda", 
    "San Andrés", "Quibdó", "Montería", "Chía", "Bello", "Rionegro"
] 

try:
    for ciudad in ciudades:
        ciudad_url = ciudad.replace(" ", "-")
        print(f"\n🔎 Buscando en {ciudad}")
        driver.get(f"https://www.airbnb.com.co/s/{ciudad_url}--Colombia/homes")
        time.sleep(3)

        for _ in range(3):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1.5)

        alojamientos = driver.find_elements(By.XPATH, "//a[contains(@href,'/rooms/')]")
        links = list({a.get_attribute("href").split("?")[0] for a in alojamientos})
        print(f"📌 {len(links)} alojamientos encontrados")

        for link in links[:5]:
            checkin = "2025-06-15"
            checkout = "2025-06-17"
            full_url = f"{link}?check_in={checkin}&check_out={checkout}&adults=1"
            driver.get(full_url)
            time.sleep(3)

            try:
                nombre = driver.find_element(By.TAG_NAME, "h1").text.strip()

                # 🟡 EXTRAER PRECIO DE FORMA FIABLE
                try:
                    # Encuentra spans que contengan texto como $123,456 COP
                    spans = driver.find_elements(By.TAG_NAME, "span")
                    precio = None
                    for span in spans:
                        text = span.text.strip()
                        if "$" in text and "COP" in text:
                            match = re.search(r"\$([\d.,]+)", text)
                            if match:
                                precio_str = match.group(1).replace(".", "").replace(",", "")
                                if precio_str.isdigit():
                                    precio = int(precio_str)
                                    break

                    if not precio or precio == 0:
                        raise ValueError("No se pudo extraer un precio válido")

                except Exception as e:
                    print(f"⚠️ No se encontró precio válido: {e}")
                    continue

                # Rating
                try:
                    rating_text = driver.find_element(By.XPATH, "//span[contains(@class,'a8jt5op') and contains(text(),'Calificación de')]").text
                    rating = float(rating_text.split()[2].replace(",", "."))
                except Exception as e:
                    print(f"⚠️ Error extrayendo rating: {e}")
                    rating = 0.0


                # Descripción
                try:
                    descripcion = driver.find_element(By.XPATH, "//div[contains(@data-section-id,'DESCRIPTION_DEFAULT')]").text
                except:
                    descripcion = ""

                # Ubicación
                try:
                    ubicacion = driver.find_element(By.XPATH, "//a[contains(@href,'/maps')]").text
                except:
                    ubicacion = ciudad

                # Facilidades - Lo que este lugar ofrece
                facilidades = []
                try:
                    facilidades_elements = driver.find_elements(By.XPATH, "//div[@class='c16f2viy']//div[@class='_19xnuo97']//div[contains(@class,'iikjzje')]//div")
                    facilidades = [el.text for el in facilidades_elements if el.text.strip()]
                except Exception as e:
                    print(f"⚠️ Error extrayendo facilidades: {e}")
                    facilidades = []


                # Opiniones
                opiniones = []
                try:
                    opinion_elements = driver.find_elements(By.XPATH, "//div[@data-review-id]")
                    for el in opinion_elements[:3]:  # Solo las primeras 3 reseñas
                        opiniones.append({
                            "texto": el.text,
                            "autor": "",
                            "fecha": "",
                        })
                except:
                    opiniones = []

                # Imágenes
                imagenes = []
                try:
                    img_elements = driver.find_elements(By.XPATH, "//img[contains(@src,'/im/pictures')]")
                    imagenes = list({img.get_attribute("src").split("?")[0] for img in img_elements if img.get_attribute("src")})
                except:
                    imagenes = []

                doc = {
                    "nombre": nombre,
                    "ciudad": ciudad,
                    "precio": precio,
                    "rating": rating,
                    "descripcion": descripcion,
                    "ubicacion": ubicacion,
                    "facilidades": facilidades,
                    "opiniones": opiniones,
                    "imagenes": imagenes,
                }

                collection.insert_one(doc)
                print(f"💾 Guardado en MongoDB: {nombre} — ${precio}")

            except Exception as e:
                print(f"❌ Error en {link}: {e}")

finally:
    driver.quit()
    print("🔚 Proceso finalizado")
