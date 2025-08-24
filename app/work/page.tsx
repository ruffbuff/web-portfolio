"use client"

import { useLanguage } from "@/components/language-provider"
import { Github } from "lucide-react"
import Link from "next/link"

export default function WorkPage() {
  const { } = useLanguage()

  return (
    <div className="min-h-screen py-16">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Work</h1>
            <p className="text-muted-foreground italic">Here is my work experience..</p>
          </div>

          {/* Notice */}
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Work Experience</h2>
            <p className="text-muted-foreground">
              Work experience has been moved to the main page along with projects.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Check out the home page to see my latest work and projects.
            </p>
          </div>

          {/* Links */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              You can check these links if you wish to:
            </p>
            <div className="flex items-center gap-6">
              <Link 
                href="https://x.com/RuffBuff_" 
                target="_blank"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>🐦</span>
                Twitter
              </Link>
              <Link 
                href="https://github.com/ruffbuff" 
                target="_blank"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                Github
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}