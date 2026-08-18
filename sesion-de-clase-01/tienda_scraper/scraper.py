import requests
from bs4 import BeautifulSoup


def obtener_soup(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return BeautifulSoup(response.text, "html.parser")
    except requests.RequestException as e:
        print(f"Hubo un error al obtener la pagina {url}: {e}")
        print("Verifica que la app 'Mi Tienda Virtual' este corriendo (npm run dev).")
        return None
