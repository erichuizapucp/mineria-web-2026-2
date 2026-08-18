"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  actualizarCliente,
  eliminarCliente,
  getClientePorId,
  registrarCliente,
} from "@/lib/api/clientes";
import { parseNumber, parseText } from "@/app/actions/helpers";

export async function crearClienteAction(formData: FormData): Promise<void> {
  const dni = parseText(formData.get("dni"), "dni");
  const nombre = parseText(formData.get("nombre"), "nombre");
  const apellidos = parseText(formData.get("apellidos"), "apellidos");

  await registrarCliente({
    dni,
    nombre,
    apellidos,
    email: `${dni}@pucp.edu.pe`,
    ciudad: "Lima",
    pais: "Peru",
    fecha_registro: new Date(),
    carritos: [],
  });
  revalidatePath("/clientes");
  redirect("/clientes");
}

export async function editarClienteAction(formData: FormData): Promise<void> {
  const id = parseNumber(formData.get("id"), "id");
  const dni = parseText(formData.get("dni"), "dni");
  const nombre = parseText(formData.get("nombre"), "nombre");
  const apellidos = parseText(formData.get("apellidos"), "apellidos");
  const previo = await getClientePorId(id);

  await actualizarCliente({
    id,
    dni,
    nombre,
    apellidos,
    email: previo.email,
    ciudad: previo.ciudad,
    pais: previo.pais,
    fecha_registro: previo.fecha_registro,
    carritos: [],
  });
  revalidatePath("/clientes");
  revalidatePath("/carrito");
  redirect("/clientes");
}

export async function eliminarClienteAction(formData: FormData): Promise<void> {
  const id = parseNumber(formData.get("id"), "id");
  await eliminarCliente(id);
  revalidatePath("/clientes");
  revalidatePath("/carrito");
  revalidatePath("/ordenes");
  redirect("/clientes");
}
