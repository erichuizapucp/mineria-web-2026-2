PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  categoria TEXT NOT NULL,
  subcategoria TEXT NOT NULL,
  precio REAL NOT NULL,
  stock INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS especificaciones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  producto_id INTEGER NOT NULL,
  clave TEXT NOT NULL,
  valor TEXT NOT NULL,
  orden INTEGER NOT NULL,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dni TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  email TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  pais TEXT NOT NULL,
  fecha_registro TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS carritos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  fecha TEXT NOT NULL,
  cliente_id INTEGER NOT NULL,
  estado TEXT NOT NULL DEFAULT 'activo' CHECK (estado IN ('activo', 'cerrado')),
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS carrito_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  carrito_id INTEGER NOT NULL,
  producto_id INTEGER NOT NULL,
  cantidad INTEGER NOT NULL,
  sub_total REAL NOT NULL,
  FOREIGN KEY (carrito_id) REFERENCES carritos(id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ordenes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  numero TEXT NOT NULL UNIQUE,
  carrito_id INTEGER NOT NULL,
  fecha TEXT NOT NULL,
  sub_total REAL NOT NULL,
  igv REAL NOT NULL,
  total REAL NOT NULL,
  FOREIGN KEY (carrito_id) REFERENCES carritos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orden_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  orden_id INTEGER NOT NULL,
  producto_id INTEGER NOT NULL,
  cantidad INTEGER NOT NULL,
  sub_total REAL NOT NULL,
  FOREIGN KEY (orden_id) REFERENCES ordenes(id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comentarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo TEXT NOT NULL CHECK (tipo IN ('producto', 'cliente_general', 'post_compra')),
  cliente_id INTEGER NOT NULL,
  producto_id INTEGER,
  orden_id INTEGER,
  calificacion INTEGER NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
  texto_comentario TEXT NOT NULL,
  fecha_comentario TEXT NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE SET NULL,
  FOREIGN KEY (orden_id) REFERENCES ordenes(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria);
CREATE INDEX IF NOT EXISTS idx_especificaciones_producto ON especificaciones(producto_id);
CREATE INDEX IF NOT EXISTS idx_clientes_ciudad ON clientes(ciudad);
CREATE INDEX IF NOT EXISTS idx_carritos_cliente_estado ON carritos(cliente_id, estado);
CREATE INDEX IF NOT EXISTS idx_ordenes_fecha ON ordenes(fecha);
CREATE INDEX IF NOT EXISTS idx_comentarios_tipo ON comentarios(tipo);
CREATE INDEX IF NOT EXISTS idx_comentarios_producto ON comentarios(producto_id);
CREATE INDEX IF NOT EXISTS idx_comentarios_cliente ON comentarios(cliente_id);

-- ---------------------------------------------------------------------------
-- Auth / seguridad de las APIs (REST + GraphQL). Ver lib/auth/*.
-- Estas tablas se re-siembran en cada arranque (SQLite en memoria) desde
-- variables de entorno; ver seedAuthData() en lib/db/seed.ts.
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  rol TEXT NOT NULL DEFAULT 'admin'
);

CREATE TABLE IF NOT EXISTS api_keys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  key_prefix TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  scopes TEXT NOT NULL DEFAULT 'read write',
  revocada INTEGER NOT NULL DEFAULT 0,
  creada_en TEXT NOT NULL,
  ultimo_uso_en TEXT
);

CREATE TABLE IF NOT EXISTS oauth_clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id TEXT NOT NULL UNIQUE,
  client_secret_hash TEXT NOT NULL,
  client_secret_salt TEXT NOT NULL,
  nombre TEXT NOT NULL,
  scopes TEXT NOT NULL DEFAULT 'read write',
  creado_en TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_api_keys_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_oauth_clients_client_id ON oauth_clients(client_id);
