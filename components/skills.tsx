"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code, Database, MessageSquare, Video, PenTool, Globe, Layers } from "lucide-react"

export function Skills() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skills = [
    {
      category: t("skills.blockchain"),
      items: [
        { name: "Blockchain Development", icon: <Database className="h-5 w-5" />, level: 70 },
        { name: "Smart Contracts", icon: <Code className="h-5 w-5" />, level: 95 },
        { name: "DeFi", icon: <Layers className="h-5 w-5" />, level: 80 },
      ],
    },
    {
      category: t("skills.development"),
      items: [
        { name: "JavaScript/TypeScript", icon: <Code className="h-5 w-5" />, level: 80 },
        { name: "Python", icon: <Code className="h-5 w-5" />, level: 95 },
        { name: "Telegram Bots", icon: <MessageSquare className="h-5 w-5" />, level: 100 },
        { name: "Web Development", icon: <Globe className="h-5 w-5" />, level: 85 },
      ],
    },
    {
      category: t("skills.content"),
      items: [
        { name: "Content Creation", icon: <PenTool className="h-5 w-5" />, level: 80 },
        { name: "Video Editing", icon: <Video className="h-5 w-5" />, level: 85 },
      ],
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
    <section id="skills" className="py-20">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t("skills.title")}</h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={groupIndex}
              variants={itemVariants}
              className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-border"
            >
              <h3 className="text-xl font-semibold mb-4">{skillGroup.category}</h3>
              <div className="space-y-4">
                {skillGroup.items.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex items-center gap-2">
                      {skill.icon}
                      <span>{skill.name}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

