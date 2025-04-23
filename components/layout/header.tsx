"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItem {
  href: string
  label: string
}

export function Header() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { href: "/#work", label: "WORK" },
    { href: "/about", label: "ABOUT" },
  ]

  return (
    <header className="mb-8">
      <div className="flex justify-between items-center">
        {/* LIZ TAN on mobile */}
        <div className="block md:hidden text-sm font-mono tracking-widest whitespace-nowrap">
          <Link href="/" className="hover:text-primary transition-colors">
            LIZ TAN
          </Link>
        </div>

        <div className="flex justify-end w-full">
          <nav className="flex gap-8 font-mono">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-xs tracking-widest hover:text-primary transition-colors ${
                  pathname === item.href || (item.href === "/#work" && pathname === "/") ? "text-primary" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-b border-border mt-8"></div>
    </header>
  )
}
