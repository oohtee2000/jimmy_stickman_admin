"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 bg-white px-6 pt-4 text-sm"
    >
      <Link
        href="/"
        className="flex items-center text-slate-500 hover:text-slate-900"
      >
        <Home className="h-4 w-4" />
      </Link>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        const label = segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        return (
          <div key={href} className="flex items-center gap-2">
            <span className="text-slate-400">/</span>

            {isLast ? (
              <span className="font-medium text-slate-900">
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="text-slate-500 hover:text-slate-900"
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}