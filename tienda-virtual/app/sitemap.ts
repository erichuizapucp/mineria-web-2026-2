import type { MetadataRoute } from "next";
import { getProductos } from "@/lib/api/productos";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "/",
    "/productos",
    "/productos/nuevo",
    "/clientes",
    "/clientes/nuevo",
    "/carrito",
    "/ordenes",
    "/testimonios",
    "/preguntas-frecuentes",
    "/politicas/envios",
    "/politicas/garantia",
    "/politicas/devoluciones",
  ];

  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "daily",
    priority: route === "/" ? 1 : 0.7,
  }));

  const productos = await getProductos();
  const productEntries: MetadataRoute.Sitemap = productos.map((producto) => ({
    url: `${SITE_URL}/productos/${producto.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticEntries, ...productEntries];
}
