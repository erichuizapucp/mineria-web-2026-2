import type { Orden } from "@/lib/modelo/orden";
import type { Cliente } from "@/lib/modelo/cliente";

/**
 * DTOs planos y serializables para las APIs. Los modelos de dominio tienen
 * referencias circulares (ItemOrden.orden <-> Orden.items) y fechas como Date;
 * estas funciones producen objetos JSON-safe compartidos por REST y GraphQL.
 */

const fechaCorta = (d: Date | string): string =>
  typeof d === "string" ? d : d.toISOString().slice(0, 10);

export function toClienteDTO(cliente: Cliente) {
  return {
    id: cliente.id,
    dni: cliente.dni,
    nombre: cliente.nombre,
    apellidos: cliente.apellidos,
    email: cliente.email,
    ciudad: cliente.ciudad,
    pais: cliente.pais,
    fechaRegistro: fechaCorta(cliente.fecha_registro),
  };
}

export function toOrdenDTO(orden: Orden) {
  return {
    id: orden.id,
    numero: orden.numero,
    fecha: fechaCorta(orden.fecha),
    subTotal: orden.subTotal,
    igv: orden.igv,
    total: orden.total,
    cliente: toClienteDTO(orden.carrito.cliente),
    items: (orden.items ?? []).map((item) => ({
      productoId: item.producto.id,
      producto: { ...item.producto },
      cantidad: item.cantidad,
      subTotal: item.subTotal,
    })),
  };
}

export type OrdenDTO = ReturnType<typeof toOrdenDTO>;
export type ClienteDTO = ReturnType<typeof toClienteDTO>;
