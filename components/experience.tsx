"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Briefcase, Calendar } from "lucide-react"

export function Experience() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experiences = [
    {
      title: "Blockchain & Crypto Basics",
      period: "2018 - 2019",
      description: "Initial exploration of blockchain technology, NFTs, and tokens. Learning fundamentals of cryptocurrency trading and investments.",
    },
    {
      title: "Crypto Trading & Analysis",
      period: "2019 - 2020",
      description: "Active trading and market analysis. Deep dive into altcoins and market trends. Building first trading strategies.",
    },
    {
      title: "Smart Contracts & Project Leadership",
      period: "2020 - 2023",
      description: "Smart contract development and project management. Leading blockchain initiatives. Initial steps in IT development.",
    },
    {
      title: "Blockchain & IT Development",
      period: "2023 - Present",
      description: "Advanced smart contract development combined with full IT stack. Building custom solutions and managing personal projects.",
    }
  ]

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t("experience.title")}</h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-border transform md:-translate-x-px" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative mb-12 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"}`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute top-0 ${
                    index % 2 === 0 ? "left-0 md:right-0 md:-mr-3.5" : "left-0 -ml-3.5"
                  } w-7 h-7 rounded-full bg-primary flex items-center justify-center z-10`}
                >
                  <Briefcase className="h-3.5 w-3.5 text-primary-foreground" />
                </div>

                <div
                  className={`relative ml-10 md:ml-0 p-6 bg-card rounded-lg shadow-md border border-border ${
                    index % 2 === 0 ? "" : ""
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{exp.period}</span>
                  </div>
                  <p className="text-sm">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

