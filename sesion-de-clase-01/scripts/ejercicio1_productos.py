from tienda_scraper.scraper import obtener_soup
from tienda_scraper.parser import parse_productos
from tienda_scraper.writer import write_to_csv
from tienda_scraper.config import URL_PRODUCTOS, OUTPUT_PRODUCTOS

if __name__ == "__main__":
    soup = obtener_soup(URL_PRODUCTOS)

    if soup:
        productos = parse_productos(soup)

        for producto in productos:
            print(producto["codigo"], producto["nombre"], producto["precio"])

        write_to_csv(productos, OUTPUT_PRODUCTOS)

    print("El scraping de productos ha finalizado.")
