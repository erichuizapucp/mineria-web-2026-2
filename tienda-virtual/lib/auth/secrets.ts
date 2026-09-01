const FALLBACK_SECRET = "dev-insecure-change-me-min-32-characters-long";

/**
 * Secreto compartido para firmar/verificar todos los JWT (cookie de sesion y
 * access tokens OAuth). Se separan los usos por el claim `aud`, no por la clave.
 */
export function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET?.trim();
  return secret && secret.length >= 16 ? secret : FALLBACK_SECRET;
}

/** Clave en el formato que espera `jose` (Uint8Array para HS256). */
export function getSecretKey(): Uint8Array {
  return new TextEncoder().encode(getAuthSecret());
}

export const AUD_SESSION = "tienda-session";
export const AUD_API = "tienda-api";
export const JWT_ISSUER = "tienda-virtual";
