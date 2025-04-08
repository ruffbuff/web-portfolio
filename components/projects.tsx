"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Database, MessageSquare, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Projects() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      title: t("projects.blockchain.title"),
      description: t("projects.blockchain.description"),
      icon: <Database className="h-10 w-10" />,
      color: "bg-purple-100 dark:bg-purple-900/20",
      iconColor: "text-purple-500",
    },
    {
      title: t("projects.telegram.title"),
      description: t("projects.telegram.description"),
      icon: <MessageSquare className="h-10 w-10" />,
      color: "bg-blue-100 dark:bg-blue-900/20",
      iconColor: "text-blue-500",
    },
    {
      title: t("projects.software.title"),
      description: t("projects.software.description"),
      icon: <Code className="h-10 w-10" />,
      color: "bg-green-100 dark:bg-green-900/20",
      iconColor: "text-green-500",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" className="py-20">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t("projects.title")}</h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-border group"
            >
              <div className={`p-6 ${project.color}`}>
                <div className={`${project.iconColor} mb-4`}>{project.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <Button variant="outline" size="sm" className="group-hover:bg-background transition-colors">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Project
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

