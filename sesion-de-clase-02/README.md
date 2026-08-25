# Proyecto de Minería Web - Sesión de clase 02

Este proyecto corresponde a los ejercicios del curso de **Minería Web** sobre técnicas de web
scraping. Todos los ejercicios apuntan a la aplicación **tienda-virtual** (Next.js) corriendo en
`http://localhost:3000`, así que esa aplicación debe estar levantada (`npm run dev` en el proyecto
`tienda-virtual`) antes de ejecutar los notebooks.

## Instalación de dependencias

Antes de ejecutar el proyecto, asegúrate de tener **Python 3.8+** instalado.

Instala las dependencias con:

```bash
pip install -r requirements.txt
playwright install chromium
```

## Ejercicios (`notebooks/`)

| Notebook | Técnica | Qué hace |
| --- | --- | --- |
| `a_robots.ipynb` | `urllib.robotparser` + verificación manual de comodines | Lee `robots.txt` y determina qué rutas puede visitar un agente. Muestra además una limitación real de `robotparser` con patrones que usan `*`. |
| `b_productos_sitemap.ipynb` | `requests` + BeautifulSoup, guiado por el sitemap | Descubre todas las URLs de producto en `sitemap-productos.xml` y descarga el detalle completo de cada uno a `data/productos.csv`. |
| `c_clientes_sitemap.ipynb` | `requests` + BeautifulSoup, sitemap + paginación | El sitemap de clientes solo expone el listado (no hay página de detalle por cliente), así que se recorre la paginación de `/clientes` hasta agotarla, guardando todo en `data/clientes.csv`. |
| `d_comentarios_beautifulsoup.ipynb` | `requests` + BeautifulSoup, paginación manual | Recorre la paginación de `/testimonios` (comentarios generales de clientes) y guarda todos los comentarios en `data/comentarios.csv`. |
| `e_resenas_entrega_playwright.ipynb` | Playwright (API asíncrona) | Automatiza un navegador para recorrer el listado paginado de `/ordenes` y extraer todas las reseñas de entrega (`post_compra`) a `data/resenas_entrega.csv`. |

Cada notebook es autocontenido: se puede ejecutar de principio a fin (`Run All`) y regenera su
CSV correspondiente en `data/`.

## Otros archivos

`pucp_scraper/` y `scripts/run_scraper.py` corresponden a un ejercicio previo (scraping del
repositorio institucional de la PUCP con Selenium) y no forman parte de los ejercicios a)-e)
descritos arriba.
