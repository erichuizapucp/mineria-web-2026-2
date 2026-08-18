from tienda_scraper.scraper import obtener_soup
from tienda_scraper.parser import parse_clientes
from tienda_scraper.writer import write_to_csv
from tienda_scraper.config import URL_CLIENTES, OUTPUT_CLIENTES

if __name__ == "__main__":
    soup = obtener_soup(URL_CLIENTES)

    if soup:
        clientes = parse_clientes(soup)

        for cliente in clientes:
            print(cliente["nombre"], cliente["apellidos"], cliente["ciudad"])

        write_to_csv(clientes, OUTPUT_CLIENTES)

    print("El scraping de clientes ha finalizado.")
