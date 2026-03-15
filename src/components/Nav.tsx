"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "🎲 Picker" },
    { href: "/managers", label: "👥 Team" },
  ];

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <span className="font-bangers text-2xl tracking-wide text-red-500">
          RELEASE ROULETTE
        </span>
        <div className="flex gap-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname === href ? "text-white" : "text-zinc-400"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
