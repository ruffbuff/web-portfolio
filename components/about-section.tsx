"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"

type AboutSectionProps = {
  isVisible: boolean
}

export function AboutSection({ isVisible }: AboutSectionProps) {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        height: isVisible ? "auto" : 0,
      }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden mb-16"
    >
      <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-3xl shadow-xl mx-4 sm:mx-8 md:mx-16 lg:mx-32 p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          {t("about.title")}
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground">{t("about.description")}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 hover:shadow-md transition-all duration-300 hover:bg-background/70">
            <h3 className="text-xl font-semibold mb-2">Experience</h3>
            <p className="text-muted-foreground">
              5+ years in blockchain and IT development across multiple countries and companies.
            </p>
          </div>

          <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 hover:shadow-md transition-all duration-300 hover:bg-background/70">
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <p className="text-muted-foreground">
              Self-taught developer with continuous learning in blockchain technologies and software development.
            </p>
          </div>

          <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 hover:shadow-md transition-all duration-300 hover:bg-background/70">
            <h3 className="text-xl font-semibold mb-2">Interests</h3>
            <p className="text-muted-foreground">
              Blockchain innovation, software development, content creation, and emerging technologies.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

