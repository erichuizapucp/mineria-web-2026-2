import { buildSitemapIndex, xmlResponseInit } from "@/lib/sitemap/xml";

export async function GET() {
  const now = new Date();

  const xml = buildSitemapIndex([
    { path: "/sitemap-general.xml", lastModified: now },
    { path: "/sitemap-productos.xml", lastModified: now },
    { path: "/sitemap-clientes.xml", lastModified: now },
    { path: "/sitemap-ordenes.xml", lastModified: now },
    { path: "/sitemap-testimonios.xml", lastModified: now },
  ]);

  return new Response(xml, xmlResponseInit());
}
