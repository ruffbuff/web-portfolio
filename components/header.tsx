"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ru" : "en")
  }

  const navItems = [
    { href: "#home", label: t("nav.home") },
    { href: "#latest-work", label: t("nav.latest") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#gallery", label: t("nav.gallery") },
    { href: "#cv", label: t("nav.cv") },
  ]

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="#home"
          className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400"
          onClick={() => handleNavClick("#home")}
        >
          RuffBuff
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.href)
              }}
            >
              {item.label}
            </a>
          ))}

          <Button variant="outline" size="sm" onClick={toggleLanguage} className="ml-4 font-medium">
            {language === "en" ? "RU" : "EN"}
          </Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <Button variant="outline" size="sm" onClick={toggleLanguage} className="mr-2 font-medium">
            {language === "en" ? "RU" : "EN"}
          </Button>

          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors py-2 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

