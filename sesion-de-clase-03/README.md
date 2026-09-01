# Proyecto de Minería Web - Sesión de clase 03

Esta sesión pasa del *scraping de HTML* (sesión 02) al **scraping de APIs**: REST,
REST con autenticación, GraphQL y, cuando no hay API, un navegador real con login
(Playwright). Los notebooks están numerados y van de menor a mayor complejidad.

**Todos** los ejercicios apuntan a la aplicación **tienda-virtual** (Next.js) corriendo
en `http://localhost:3000`, así que debe estar levantada antes de ejecutarlos:

```bash
cd ../tienda-virtual
cp .env.example .env.local   # solo la primera vez
npm install                  # solo la primera vez
npm run dev
```

Documentación de las APIs de la tienda: [`tienda-virtual/docs/API.md`](../tienda-virtual/docs/API.md)
(REST) y [`tienda-virtual/docs/GRAPHQL.md`](../tienda-virtual/docs/GRAPHQL.md).

## Instalación de dependencias

Requiere **Python 3.8+**.

```bash
pip install -r requirements.txt
playwright install chromium
```

## Ejercicios (`notebooks/`)

Se ejecutan en orden; cada notebook agrega una capa sobre el anterior.

| Notebook | Técnica | Qué hace |
| --- | --- | --- |
| `01_rest_recurso_y_coleccion.ipynb` | `requests` contra la API REST de la tienda | Primer contacto: `GET /api/health` (sin credencial), un recurso individual (`/api/productos/1`) y una página de la colección (`/api/productos`) con el header `x-api-key`. Guarda `data/rest_muestra_productos.csv`. |
| `02_rest_paginacion.ipynb` | Paginación por número de página (`pageInfo`) | Recorre `/api/productos` y `/api/clientes` completos (bucle `page` hasta `totalPages`, y variante calculando `totalPages` de antemano); muestra que `/api/comentarios` no pagina. Guarda `data/rest_productos.csv` y `data/rest_clientes.csv`. |
| `03_rest_autenticado_api_key.ipynb` | La **API key** a fondo | `401 unauthorized` sin credencial vs `401 invalid_api_key` con una inválida; *scopes* `read`/`write` (alta y baja de un producto de prueba); revocación desde `/admin/api-keys`. Scrapea todos los testimonios a `data/rest_testimonios.csv`. |
| `04_rest_autenticado_oauth.ipynb` | REST con **OAuth2 `client_credentials`** | Obtiene un `access_token` en `POST /api/oauth/token`, lo renueva solo antes de que expire (`ClienteOAuth`) y pagina `/api/ordenes` con `Authorization: Bearer`. Guarda `data/rest_ordenes.csv`. |
| `05_graphql_consultas_basicas.ipynb` | GraphQL: primera query | `POST /api/graphql` con `x-api-key`; query plana de productos, manejo del array `errors` (llega con HTTP 200), introspección del esquema y paginación con variables. Guarda `data/graphql_productos.csv`. |
| `06_graphql_consultas_anidadas.ipynb` | GraphQL: variables + anidado + OAuth | Una sola query trae cada orden con su `cliente` y sus `items` (y el `producto` de cada ítem); autentica con OAuth Bearer y consulta las reseñas de entrega (`comentarios(tipo: "post_compra")`) por orden. Guarda `data/graphql_ordenes.csv` y `data/graphql_resenas_entrega.csv`. |
| `07_playwright_paginas_con_login.ipynb` | Playwright con **login** | `/ordenes` redirige (307) a `/login` sin sesión. Playwright completa el formulario (`admin@tienda.local` / `admin123`), guarda el `storage_state`, recorre el listado paginado protegido extrayendo las reseñas de entrega embebidas y reutiliza la sesión para entrar a `/admin/api-keys`. Guarda `data/playwright_resenas_entrega.csv`. |

Cada notebook es autocontenido: se puede ejecutar de principio a fin (`Run All`) y
regenera sus CSV en `data/`.

## Credenciales demo de tienda-virtual

Se re-siembran en cada arranque de la app (ver `tienda-virtual/.env.example`):

| Qué | Valor |
| --- | --- |
| Admin (login del back-office) | `admin@tienda.local` / `admin123` |
| API key | `sk_demo_000000000000000000000000000000` |
| Cliente OAuth (`client_credentials`) | `scraper-demo` / `scraper-demo-secret` |

El archivo `data/playwright_storage_state.json` que genera el notebook 07 contiene un
JWT de sesión local (caduca en 8 h) y está en `.gitignore`.
