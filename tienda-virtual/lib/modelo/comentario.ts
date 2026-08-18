export type TipoComentario = "producto" | "cliente_general" | "post_compra";

export interface Comentario {
  id: number;
  tipo: TipoComentario;
  cliente_id: number;
  producto_id: number | null;
  orden_id: number | null;
  calificacion: number;
  texto_comentario: string;
  fecha_comentario: string;
}
