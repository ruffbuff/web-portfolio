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
    <section id="projects" className="py-24 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
            {t("projects.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Featured projects showcasing my expertise in blockchain and software development
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group glass rounded-2xl p-6 card-hover border border-border/40 relative overflow-hidden h-[280px] flex flex-col"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-200">
                    {project.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm flex-grow mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Action */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full rounded-full border-border/40 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
                  onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
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

