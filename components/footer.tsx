"use client"

import { useLanguage } from "@/components/language-provider"
import { Github, Mail } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted py-12">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Contact Links - Left Side */}
          <div className="mb-6 md:mb-0 order-2 md:order-1">
            <h3 className="text-lg font-semibold mb-2">{t("footer.contact")}</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/ruffbuff"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/ruffbuff"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
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
                  className="h-5 w-5"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a
                href="https://t.me/ruffbuff"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
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
                  className="h-5 w-5"
                >
                  <path d="M21.5 4.5l-19 7.5 7 3.5" />
                  <path d="M9.5 15.5l-2 5.5 4 -3.5 7.5 3.5 -9.5 -15.5" />
                </svg>
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Copyright - Centered */}
          <div className="text-sm text-muted-foreground text-center order-1 md:order-2">
            {t("footer.copyright").replace("2024", "2025")}
          </div>

          {/* Empty div for balance in flexbox */}
          <div className="hidden md:block order-3 w-[180px]"></div>
        </div>
      </div>
    </footer>
  )
}

