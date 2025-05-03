from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from urllib.parse import urlparse, parse_qs
from datetime import datetime
from pymongo import MongoClient
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
db = client["test"]  # Asegúrate que es la base correcta en Railway
hotels_col = db["hotels"]

try:
    url = ("https://www.airbnb.com.co/s/Bucaramanga--Santander--Colombia/homes?refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2025-06-01&monthly_length=3&monthly_end_date=2025-08-01&price_filter_input_type=2&channel=EXPLORE&acp_id=4d043215-74eb-4780-956b-7b6e282ac6dc&date_picker_type=calendar&source=structured_search_input_header&search_type=autocomplete_click&price_filter_num_nights=5&place_id=ChIJ7cBR93oVaI4RbMNIEVXkoHU&location_bb=QOVUhMKSMA9A4j8LwpJYHA%3D%3D&checkin=2025-05-10&checkout=2025-05-12")
    driver.get(url)

    print("🔎 Cargando resultados de Airbnb...")
    for _ in range(5):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)

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

            hotel = {
                "nombre": title,
                "ciudad": "Bucaramanga",
                "precio": price,
                "rating": rating,
                "descripcion": description,
                "ubicacion": "",
                "facilidades": [],
                "opiniones": [],
                "imagenes": [img_url] if img_url else []
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
