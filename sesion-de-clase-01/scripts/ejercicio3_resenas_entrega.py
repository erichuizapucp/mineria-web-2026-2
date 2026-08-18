from tienda_scraper.scraper import obtener_soup
from tienda_scraper.parser import parse_resenas_entrega
from tienda_scraper.writer import write_to_csv
from tienda_scraper.config import URL_ORDEN, OUTPUT_RESENAS_ENTREGA

if __name__ == "__main__":
    soup = obtener_soup(URL_ORDEN)

    if soup:
        resenas = parse_resenas_entrega(soup)

        if not resenas:
            print(f"La orden en {URL_ORDEN} no tiene resenas de entrega. "
                  "Prueba con otro ORDEN_ID en tienda_scraper/config.py.")

        for resena in resenas:
            print(resena["autor"], "-", resena["producto"], "-", resena["calificacion"])
            print(" ", resena["comentario"])

        write_to_csv(resenas, OUTPUT_RESENAS_ENTREGA)

    print("El scraping de resenas de entrega ha finalizado.")
