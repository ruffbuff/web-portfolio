"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function About() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("about.title")}</h2>
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-primary/20 rounded-full" />
            <p className="text-lg leading-relaxed text-muted-foreground">{t("about.description")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

