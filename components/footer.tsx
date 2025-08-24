"use client"

import { useLanguage } from "@/components/language-provider"
import { Github, Mail } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-16 mt-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      <div className="container px-4 mx-auto relative">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* Logo/Brand */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              RuffBuff
            </h3>
            <p className="text-muted-foreground text-sm mt-2">
              Blockchain & IT Developer
            </p>
          </div>

          {/* Contact Links */}
          <div className="mb-8">
            <h4 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-wider">
              {t("footer.contact")}
            </h4>
            <div className="flex space-x-6">
              <a
                href="https://github.com/ruffbuff"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              </a>
              <a
                href="https://x.com/RuffBuff_"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 group"
                aria-label="X (Twitter)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a
                href="https://t.me/ruffbuff"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 group"
                aria-label="Telegram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                >
                  <path d="M21.5 4.5l-19 7.5 7 3.5" />
                  <path d="M9.5 15.5l-2 5.5 4 -3.5 7.5 3.5 -9.5 -15.5" />
                </svg>
              </a>
              <a
                href="mailto:ruffgreenw@gmail.com"
                className="p-3 rounded-full glass border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t("footer.copyright").replace("2024", currentYear.toString())}
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              Built with Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

