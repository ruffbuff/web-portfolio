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
    <section id="skills" className="py-16">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="space-y-8">
          {/* Section Header */}
          <h2 className="text-2xl font-bold text-foreground">
            {t("skills.title")}
          </h2>
          
          <div className="text-muted-foreground">
            <p className="mb-4">
              My main Tech stack is{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>⚡</span>
                <span className="text-primary font-semibold">Next.js</span>
              </span>{" "}
              framework with{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>🎨</span>
                <span className="text-primary font-semibold">TailwindCSS</span>
              </span>{" "}
              . CSS as a styling library, for the database I use{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>🐘</span>
                <span className="text-primary font-semibold">PostgreSQL</span>
              </span>{" "}
              deployed on{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>🗃️</span>
                <span className="text-primary font-semibold">NeonDB</span>
              </span>{" "}
              with{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>⚡</span>
                <span className="text-primary font-semibold">Drizzle</span>
              </span>{" "}
              as an ORM, for database management I use{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>📊</span>
                <span className="text-primary font-semibold">DataGrip</span>
              </span>{" "}
              .
            </p>
            
            <p className="mb-6">
              At last, but not least, I use{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>⚡</span>
                <span className="text-primary font-semibold">Cursor</span>
              </span>{" "}
              IDE for creating awesome projects. 🖤
            </p>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
              &lt;LANGUAGES/&gt;
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                JavaScript
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                TypeScript
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Python
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Solidity
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                HTML
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                CSS
              </span>
            </div>
          </div>

          {/* Frameworks */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
              &lt;FRAMEWORKS/&gt;
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                React
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                Next.js
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Node.js
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                TailwindCSS
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                Framer Motion
              </span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
              &lt;TOOLS/&gt;
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Drizzle
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Prisma
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                NeonDB
              </span>
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
              &lt;PLATFORMS/&gt;
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                GitHub
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Netlify
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                Vercel
              </span>
            </div>
          </div>

          {/* Software */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
              &lt;SOFTWARE/&gt;
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Cursor
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                DataGrip
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Postman
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Figma
              </span>
            </div>
          </div>

          <div className="text-sm text-muted-foreground italic mt-8">
            Few more... but secret hehehe :)
          </div>
        </div>
      </div>
    </section>
  )
}

