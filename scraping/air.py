from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pymongo import MongoClient
from urllib.parse import urlparse, unquote
import os, time

# Cargar variables de entorno
load_dotenv()

# Configurar Selenium
chrome_options = Options()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--window-size=1920,1080')
chrome_options.add_argument('--disable-blink-features=AutomationControlled')
chrome_options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

driver = webdriver.Chrome(options=chrome_options)
wait = WebDriverWait(driver, 15)

# Conexión a MongoDB
mongo_uri = os.environ.get("MONGO_URI")
client = MongoClient(mongo_uri)
db = client["test"]
hotels_col = db["hotels"]

try:
    url = ("https://www.airbnb.com.co/s/Cali/homes?flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2025-06-01&monthly_length=3&monthly_end_date=2025-09-01&price_filter_input_type=2&channel=EXPLORE&refinement_paths%5B%5D=%2Fhomes&place_id=ChIJ8bNLzPCmMI4RaGGuUum1Dx8&date_picker_type=calendar&checkin=2025-05-10&checkout=2025-05-12&source=structured_search_input_header&search_type=AUTOSUGGEST")
    driver.get(url)

    # Extraer solo la ciudad desde la URL
    try:
        parsed = urlparse(url)
        path = parsed.path
        parts = path.split("/")
        if "s" in parts:
            raw_city = parts[parts.index("s") + 1]
            full_location = unquote(raw_city.replace("--", ", ").replace("-", " "))
            ciudad_global = full_location.split(",")[0].strip()  # Solo ciudad
        else:
            ciudad_global = "Desconocida"
    except:
        ciudad_global = "Desconocida"

    print(f"📍 Ciudad detectada desde URL: {ciudad_global}")
    print("🔎 Cargando resultados de Airbnb...")
    for _ in range(10):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(4)

    cards = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "[data-testid='card-container']")))
    print(f"📌 Se encontraron {len(cards)} alojamientos\n")

    for index, card in enumerate(cards, 1):
        try:
            title = card.find_element(By.CSS_SELECTOR, "[data-testid='listing-card-name']").text.strip()
            if not title:
                continue

            try:
                description = card.find_element(By.CSS_SELECTOR, "[data-testid='listing-card-title']").text.strip()
            except:
                description = "N/A"

            try:
                price_elem = card.find_element(By.CSS_SELECTOR, "div[style*='--pricing'] > div > span > div > span")
                price_text = price_elem.text.strip().replace(" por noche", "").replace("$", "").replace(",", "")
                price = float(price_text.split()[0]) if price_text else 0
            except:
                price = 0

            try:
                rating_elem = card.find_element(By.XPATH, ".//span[contains(text(), 'Calificación promedio')]")
                rating = float(rating_elem.text.replace("Calificación promedio: ", "").strip())
            except:
                rating = 1.0

            try:
                img_url = card.find_element(By.TAG_NAME, "img").get_attribute("src")
            except:
                img_url = None

            # Facilidades
            facilidades = []
            try:
                badges = card.find_elements(By.CSS_SELECTOR, "[data-testid='listing-card-feature-badge']")
                facilidades = [b.text.strip() for b in badges if b.text.strip()]
            except:
                facilidades = []

            print(f"🌍 Ciudad: {ciudad_global}")
            print(f"🛏️ Facilidades: {facilidades}")

            if price == 0 or not img_url:
                print(f"⚠️ Omitido #{index} por datos inválidos (precio: {price}, img: {img_url})")
                continue

            hotel = {
                "nombre": title,
                "ciudad": ciudad_global,
                "precio": price,
                "rating": rating,
                "descripcion": description,
                "ubicacion": "No disponible",
                "facilidades": facilidades,
                "opiniones": [],
                "imagenes": [img_url]
            }

            hotels_col.insert_one(hotel)
            print(f"✅ Guardado en MongoDB: {title}")

        except Exception as e:
            print(f"❌ Error procesando alojamiento #{index}: {e}")

except Exception as e:
    print(f"❌ Error general: {e}")

finally:
    driver.quit()
    client.close()
