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
      link: "https://github.com/ruffbuff/Hackathon-2024-OnChainTTT",
    },
    {
      title: t("projects.telegram.title"),
      description: t("projects.telegram.description"),
      icon: <MessageSquare className="h-10 w-10" />,
      color: "bg-blue-100 dark:bg-blue-900/20",
      iconColor: "text-blue-500",
      link: "https://github.com/ruffbuff/Telegram-Ai-Bot",
    },
    {
      title: t("projects.software.title"),
      description: t("projects.software.description"),
      icon: <Code className="h-10 w-10" />,
      color: "bg-green-100 dark:bg-green-900/20",
      iconColor: "text-green-500",
      link: "https://github.com/ruffbuff/LuaLevelMaker",
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
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/30 group h-[320px] flex flex-col"
            >
              <div className={`p-6 ${project.color} flex flex-col flex-grow transition-all duration-300 group-hover:saturate-125`}>
                <div className={`${project.iconColor} mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>{project.icon}</div>
                <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">{project.title}</h3>
                <div className="flex-grow overflow-auto mb-4 pr-1 custom-scrollbar">
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">{project.description}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-auto bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-300 transform group-hover:translate-y-0 flex items-center justify-center"
                  onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                >
                  <ExternalLink className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                  <span>View Project</span>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

