from bs4 import BeautifulSoup


def parse_productos(soup: BeautifulSoup):
    """Ejercicio 1: codigo, nombre y precio de cada producto listado en /productos."""
    productos = []

    for fila in soup.select("table tbody tr"):
        codigo_tag = fila.select_one("td:nth-child(1)")
        nombre_tag = fila.select_one("td:nth-child(2)")
        precio_tag = fila.select_one("td:nth-child(4)")

        productos.append({
            "codigo": codigo_tag.get_text(strip=True) if codigo_tag else None,
            "nombre": nombre_tag.get_text(strip=True) if nombre_tag else None,
            "precio": precio_tag.get_text(strip=True) if precio_tag else None,
        })

    return productos


def parse_clientes(soup: BeautifulSoup):
    """Ejercicio 2: nombre, apellidos y ciudad de cada cliente listado en /clientes."""
    clientes = []

    for fila in soup.select("table tbody tr"):
        nombre_tag = fila.select_one("td:nth-child(1)")
        apellidos_tag = fila.select_one("td:nth-child(2)")
        ciudad_tag = fila.select_one("td:nth-child(5)")

        clientes.append({
            "nombre": nombre_tag.get_text(strip=True) if nombre_tag else None,
            "apellidos": apellidos_tag.get_text(strip=True) if apellidos_tag else None,
            "ciudad": ciudad_tag.get_text(strip=True) if ciudad_tag else None,
        })

    return clientes


def parse_resenas_entrega(soup: BeautifulSoup):
    """Ejercicio 3: autor, producto, calificacion y comentario de las resenas
    de entrega de una orden (/ordenes/{id})."""
    resenas = []

    # Cada resena de entrega es un <li itemprop="review" data-calificacion="...">
    for resena in soup.select('li[itemprop="review"]'):
        autor_tag = resena.select_one('span[itemprop="name"]')
        producto_tag = resena.select_one("p span.font-normal")
        comentario_tag = resena.select_one('p[itemprop="reviewBody"]')

        producto = None
        if producto_tag:
            # el texto viene como " - Nombre del producto"
            producto = producto_tag.get_text(strip=True).lstrip("-").strip()

        resenas.append({
            "autor": autor_tag.get_text(strip=True) if autor_tag else None,
            "producto": producto,
            "calificacion": resena.get("data-calificacion"),
            "comentario": comentario_tag.get_text(strip=True) if comentario_tag else None,
        })

    return resenas
