import { autenticarPeticionApi } from "@/lib/auth/guard";
import { jsonOk, parsePaginacion } from "@/lib/api/rest";
import { getTestimoniosPaginado } from "@/lib/api/comentarios";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = await autenticarPeticionApi(req);
  if (auth instanceof Response) return auth;

  const { searchParams } = new URL(req.url);
  const { page, pageSize } = parsePaginacion(searchParams);
  const resultado = await getTestimoniosPaginado(page, pageSize);

  return jsonOk({
    items: resultado.items,
    pageInfo: {
      page: resultado.page,
      pageSize: resultado.pageSize,
      total: resultado.total,
      totalPages: resultado.totalPages,
    },
  });
}
