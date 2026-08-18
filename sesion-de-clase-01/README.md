# Proyecto de Minería Web - Sesión de clase 01

Este proyecto corresponde al **primer ejercicio del curso de Minería Web**.
En este proyecto se realiza un **web scraping inicial** con Python y BeautifulSoup, usando como fuente de
datos la aplicación **"Mi Tienda Virtual"** (NextJS) del mismo repositorio.

---

## Estructura del proyecto

- `/tienda_scraper/` → Paquete Python con la lógica de scraping (`config`, `scraper`, `parser`, `writer`).
- `/scripts/` → Un script por ejercicio.
- `/data/` → Archivos CSV generados.
- `requirements.txt` → Dependencias necesarias para el proyecto.
- `README.md` → Este archivo con la documentación del proyecto.

---

## Instalación de dependencias

Antes de ejecutar el proyecto, asegúrate de tener **Python 3.8+** instalado.
Luego instala las dependencias usando:

```bash
pip install -r requirements.txt
```

---

## Paso previo: levantar "Mi Tienda Virtual"

Los ejercicios de esta sesión hacen scraping sobre la app `tienda-virtual` corriendo en `http://localhost:3000`.
En una terminal aparte, dentro de la carpeta `tienda-virtual`:

```bash
npm run dev
```

Deja ese servidor corriendo mientras ejecutas los scripts de Python de esta carpeta.

---

## Ejercicios propuestos

**Ejercicio 1** (`scripts/ejercicio1_productos.py`): extrae código, nombre y precio de cada producto
listado en `/productos`.

**Ejercicio 2** (`scripts/ejercicio2_clientes.py`): extrae nombre, apellidos y ciudad de cada cliente
listado en `/clientes`.

**Ejercicio 3** (`scripts/ejercicio3_resenas_entrega.py`): extrae, de una orden en `/ordenes/{id}`, las
reseñas de entrega: autor, producto, calificación y comentario. El ID de la orden se configura en
`tienda_scraper/config.py` (`ORDEN_ID`); si esa orden no tiene reseñas, revisa la sección Órdenes de la
app y prueba con otro ID.

Cada script imprime los resultados en consola y los guarda como CSV en `data/`.

El scraping en profundidad de todo el sitio se abordará en la siguiente clase; esta actividad busca una
primera práctica guiada con datos reales.
