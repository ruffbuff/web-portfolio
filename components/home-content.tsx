"use client"

import { useState } from "react"
import { Hero } from "@/components/hero"
import { useLanguage } from "@/components/language-provider"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

export function HomeContent() {
  const { t } = useLanguage()
  const [showAbout, setShowAbout] = useState(false)

  const toggleAbout = () => {
    setShowAbout(!showAbout)
  }

  return (
    <div className="relative">
      <Hero />

      {/* About Me Toggle Button */}
      <div className="relative z-10 w-full flex justify-center -mt-32 mb-8">
        <motion.div
          className="cursor-pointer group"
          onClick={toggleAbout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-base font-medium text-primary mb-2 group-hover:text-primary/80 transition-colors">
              {showAbout ? "Hide About Me" : "About Me"}
            </span>
            <div className="bg-primary/20 backdrop-blur-sm p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary/30 border border-primary/20 group-hover:border-primary/40">
              {showAbout ? (
                <ChevronUp className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors" />
              ) : (
                <ChevronDown className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors" />
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* About Me Section */}
      <AnimatePresence>
        {showAbout && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mb-16"
          >
            <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-3xl shadow-xl mx-4 sm:mx-8 md:mx-16 lg:mx-32 p-8">
              <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                {t("about.title")}
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{t("about.description")}</p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 hover:shadow-md transition-all duration-300 hover:bg-background/70 hover:translate-y-[-5px]">
                  <h3 className="text-xl font-semibold mb-2">Experience</h3>
                  <p className="text-muted-foreground">
                    5+ years in blockchain and IT development across multiple countries and companies.
                  </p>
                </div>

                <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 hover:shadow-md transition-all duration-300 hover:bg-background/70 hover:translate-y-[-5px]">
                  <h3 className="text-xl font-semibold mb-2">Education</h3>
                  <p className="text-muted-foreground">
                    Self-taught developer with continuous learning in blockchain technologies and software development.
                  </p>
                </div>

                <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 hover:shadow-md transition-all duration-300 hover:bg-background/70 hover:translate-y-[-5px]">
                  <h3 className="text-xl font-semibold mb-2">Interests</h3>
                  <p className="text-muted-foreground">
                    Blockchain innovation, software development, content creation, and emerging technologies.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

