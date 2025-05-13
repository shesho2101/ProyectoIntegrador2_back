import time
import requests
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime

# Cargar variables de entorno
load_dotenv()

# Conexión a MongoDB
mongo_uri = os.environ.get("MONGO_URI")
client = MongoClient(mongo_uri)
db = client["test"]
buses_col = db["buses"]

# URL de la nueva API de Berlinas
url_api = "https://one-api.berlinasdelfonce.com/api/v2/search"

# Mapeo de IDs de ciudades nuevas
ids_ciudades = {
    "Bogotá": "bogota-30a77815-9391-48ec-9535-6d47461d03d8",
    "Bucaramanga": "bucaramanga-80e95b28-0833-43af-b5c6-3b2e850bbb47",
    "Santa Marta": "santa-marta-5132cae0-1f29-4bd3-9239-188a3a9eeddb",
    "Barranquilla": "barranquilla-13e415d1-aa93-4982-85e3-403817e483dc",
    "Cartagena": "cartagena-c6268530-c2a4-40cd-91fd-71a2a6df7705",
}

# Definir rutas
rutas = [
    ("Bogotá", "Bucaramanga"),
    ("Bucaramanga", "Bogotá"),
    ("Bogotá", "Santa Marta"),
    ("Santa Marta", "Bogotá"),
    ("Barranquilla", "Cartagena"),
    ("Cartagena", "Barranquilla"),
    ("Santa Marta", "Barranquilla"),
    ("Barranquilla", "Santa Marta"),
    ("Cartagena", "Santa Marta"),
    ("Santa Marta", "Cartagena"),
]

# Fecha actual (hoy)
fecha_hoy = datetime.today().strftime("%d-%m-%Y")  # "26-04-2025"

# Token de autorización capturado
authorization_token = "Token token=33a88615141123d32ba4d28027d8dcba"

def obtener_viajes(origen, destino, intentos=5):
    """Intentar obtener viajes, con reintentos en caso de error 429"""
    for intento in range(intentos):
        try:
            print(f"🔎 Buscando viajes de {origen} a {destino}...")

            payload = {
                "origin": ids_ciudades[origen],
                "destination": ids_ciudades[destino],
                "date": fecha_hoy,
                "passengers": ["adult"],
                "round": False,
                "way": "departure"
            }

            headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": authorization_token,  # 👈 Muy importante
                "Origin": "https://viaje.berlinasdelfonce.com",  # 👈 También copiamos esto
                "Referer": "https://viaje.berlinasdelfonce.com/"
            }

            response = requests.post(url_api, json=payload, headers=headers)

            if response.status_code == 200:
                data = response.json()

                if "terminals" in data and "lines" in data:
                    for terminal_id, terminal_info in data["terminals"].items():
                        viaje = {
                            "origen": origen,
                            "destino": destino,
                            "fecha_salida": fecha_hoy,
                            "precio": 0,
                            "compania": "Berlinas del Fonce",
                            "duracion": "N/A",
                            "tipo_bus": "Lujo"
                        }
                        buses_col.insert_one(viaje)
                        print(f"✅ Guardado viaje de {origen} a {destino}")
                else:
                    print(f"⚠️ No se encontraron viajes entre {origen} y {destino}")
                break  # Si la solicitud fue exitosa, salir del bucle

            elif response.status_code == 429:  # Límite de solicitudes excedido
                print(f"⚠️ Error 429: Límite de solicitudes alcanzado. Intentando nuevamente en {2 ** intento} segundos...")
                time.sleep(2 ** intento)  # Espera exponencial (2, 4, 8, 16, 32 segundos)
            else:
                print(f"❌ Error consultando API para {origen} -> {destino}: {response.status_code}")
                break

        except Exception as e:
            print(f"❌ Error procesando ruta {origen} -> {destino}: {e}")
            break

for origen, destino in rutas:
    obtener_viajes(origen, destino)

client.close()
print("✅ Scraping terminado")
