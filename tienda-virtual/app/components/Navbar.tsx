import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";
import { getSesion } from "@/lib/auth/requireSession";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/clientes", label: "Clientes" },
  { href: "/carrito", label: "Carrito" },
  { href: "/ordenes", label: "Ordenes" },
  { href: "/testimonios", label: "Testimonios" },
];

export default async function Navbar() {
  const sesion = await getSesion();

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-white">Mi Tienda Virtual</h1>
        <ul className="flex flex-wrap items-center gap-2 md:gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-block rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {sesion ? (
            <>
              <li>
                <Link
                  href="/admin/api-keys"
                  className="inline-block rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
                >
                  API keys
                </Link>
              </li>
              <li>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="inline-block rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                  >
                    Salir
                  </button>
                </form>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                className="inline-block rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
              >
                Ingresar
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
