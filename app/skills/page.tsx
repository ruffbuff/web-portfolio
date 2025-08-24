"use client"

import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { getLanguageColor } from "@/lib/github"

interface LanguageStats {
  [language: string]: number
}

export default function SkillsPage() {
  const { } = useLanguage()
  const [languageStats, setLanguageStats] = useState<LanguageStats>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLanguageStats()
  }, [])

  const fetchLanguageStats = async () => {
    try {
      const response = await fetch('/api/github/languages')
      if (response.ok) {
        const stats = await response.json()
        setLanguageStats(stats)
      }
    } catch (error) {
      console.error('Error fetching language stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTopLanguages = () => {
    const sorted = Object.entries(languageStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
    
    const total = sorted.reduce((sum, [,bytes]) => sum + bytes, 0)
    return sorted.map(([lang, bytes]) => ({
      name: lang,
      percentage: ((bytes / total) * 100).toFixed(1),
      color: getLanguageColor(lang)
    }))
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Skills</h1>
            <p className="text-muted-foreground italic">What I can do below..</p>
          </div>
          
          <div className="text-muted-foreground">
            <p className="mb-4">
              My core programming language is{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>🐍</span>
                <span className="text-primary font-semibold">Python</span>
              </span>{" "}
              for backend development and automation. For frontend, I specialize in{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>⚛️</span>
                <span className="text-primary font-semibold">React/Next.js</span>
              </span>{" "}
              with{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>📘</span>
                <span className="text-primary font-semibold">TypeScript</span>
              </span>{" "}
              and{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>🎨</span>
                <span className="text-primary font-semibold">TailwindCSS</span>
              </span>{" "}
              for styling.
            </p>
            
            <p className="mb-4">
              For databases, I work with{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>⚡</span>
                <span className="text-primary font-semibold">Supabase</span>
              </span>{" "}
              ,{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>🗃️</span>
                <span className="text-primary font-semibold">NeonDB</span>
              </span>{" "}
              , and{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>🐬</span>
                <span className="text-primary font-semibold">MySQL</span>
              </span>{" "}
              . I also write in{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>⚙️</span>
                <span className="text-primary font-semibold">C++</span>
              </span>{" "}
              ,{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>💎</span>
                <span className="text-primary font-semibold">Solidity</span>
              </span>{" "}
              for smart contracts, and{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>🌙</span>
                <span className="text-primary font-semibold">Lua</span>
              </span>{" "}
              for scripting.
            </p>
            
            <p className="mb-6">
              I develop primarily on{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>🐧</span>
                <span className="text-primary font-semibold">Arch Linux</span>
              </span>{" "}
              and have a passion for exploring{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span>🤖</span>
                <span className="text-primary font-semibold">AI/ML models</span>
              </span>{" "}
              and their capabilities. 🚀
            </p>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
              &lt;LANGUAGES/&gt;
            </h3>
            {isLoading ? (
              <div className="text-sm text-muted-foreground">Loading language stats...</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {getTopLanguages().map((lang) => (
                  <span key={lang.name} className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: lang.color }}
                    ></span>
                    {lang.name}
                    <span className="text-xs text-muted-foreground ml-1">({lang.percentage}%)</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Frameworks */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
              &lt;FRAMEWORKS/&gt;
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                React
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Next.js
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Vite
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
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Web3
              </span>
            </div>
          </div>

          {/* Database & Tools */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
              &lt;DATABASE & TOOLS/&gt;
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Supabase
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                NeonDB
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                MySQL
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Drizzle
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Prisma
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                DataGrip
              </span>
            </div>
          </div>

          {/* Operating Systems & Platforms */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
              &lt;PLATFORMS & OS/&gt;
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Arch Linux
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Ubuntu
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                GitHub
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                Vercel
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Netlify
              </span>
            </div>
          </div>

          {/* Development Tools & AI */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
              &lt;DEVELOPMENT & AI/&gt;
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Postman
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Docker
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                Git
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                PostgreSQL
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Neovim
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                AI Models
              </span>
            </div>
          </div>

          {/* Learning & Exploring */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
              &lt;EXPLORING/&gt;
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                C#
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                Java
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Go
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Rust
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                WebAssembly
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Blender
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Unreal Engine
              </span>
            </div>
          </div>

          <div className="text-sm text-muted-foreground italic mt-8">
            Few more... but secret hehehe :)
          </div>
        </div>
      </div>
    </div>
  )
}