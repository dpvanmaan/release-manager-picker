"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data?.email) setUserEmail(data.email); })
      .catch(() => {});
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const links = [
    { href: "/", label: "🎲 Picker" },
    { href: "/managers", label: "👥 Team" },
    { href: "/users", label: "🔑 Users" },
  ];

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <span className="font-bangers text-2xl tracking-wide text-red-500">
          RELEASE ROULETTE
        </span>
        <div className="flex items-center gap-4">
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
          {userEmail && (
            <span className="text-xs text-zinc-500">{userEmail}</span>
          )}
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}
