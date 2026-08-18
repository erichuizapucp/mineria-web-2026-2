import Link from "next/link";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/clientes", label: "Clientes" },
  { href: "/carrito", label: "Carrito" },
  { href: "/ordenes", label: "Ordenes" },
  { href: "/testimonios", label: "Testimonios" },
];

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-white">Mi Tienda Virtual</h1>
        <ul className="flex flex-wrap gap-2 md:gap-4">
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
        </ul>
      </div>
    </nav>
  );
}
