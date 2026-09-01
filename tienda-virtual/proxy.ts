import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verificarSesion } from "@/lib/auth/session";

/**
 * Protege las secciones de back-office (convencion `proxy` de Next 16, antes
 * `middleware`). Solo verifica el JWT de sesion (jose es Edge-safe); NO toca la
 * base de datos (sqlite no corre en el Edge runtime). El REST/GraphQL API
 * (/api/*) queda fuera del matcher: usa su propio guard (lib/auth/guard.ts) con
 * API-KEY u OAuth.
 */
export async function proxy(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const sesion = await verificarSesion(token);

  if (sesion) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  const destino = url.pathname + url.search;
  url.pathname = "/login";
  url.search = `?next=${encodeURIComponent(destino)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/clientes/:path*",
    "/ordenes/:path*",
    "/carrito/:path*",
    "/productos/nuevo",
    "/productos/:id/editar",
    "/admin/:path*",
  ],
};
