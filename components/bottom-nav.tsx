"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, User, FileText, Brain } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()
  
  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/skills", icon: User, label: "Skills" },
    { href: "/projects", icon: Brain, label: "Projects" },
    { href: "/cv", icon: FileText, label: "CV" }
  ]

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm border border-border rounded-full px-2 py-2 shadow-lg">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:block">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}