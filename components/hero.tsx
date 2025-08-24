"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Github, Mail, ExternalLink } from "lucide-react"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-16">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-left space-y-6">
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            RUFFBUFF
          </h1>
          
          {/* Subtitle with typing effect styling */}
          <div className="text-lg text-muted-foreground space-y-2">
            <div>
              <span className="text-muted-foreground">Yup! I'm a </span>
              <span className="text-primary font-semibold">Blockchain Engineer</span>
              <span className="text-muted-foreground">. Big deal, right? But wait — there's more! I'm not just any developer,</span>
            </div>
            <div>
              <span className="text-muted-foreground">I'm a </span>
              <span className="text-primary font-semibold">Full Stack Developer</span>
              <span className="text-muted-foreground">. And if that wasn't enough, guess what?</span>
            </div>
            <div>
              <span className="text-muted-foreground">maybe </span>
              <span className="text-primary font-semibold">Freelancer</span>
              <span className="text-muted-foreground">? Oh yeah, I've got that badge too!</span>
            </div>
          </div>

          {/* Description */}
          <div className="text-muted-foreground max-w-2xl">
            <p>
              I love both <span className="text-primary font-semibold">Blockchain</span> & <span className="text-primary font-semibold">Development</span>, so. That means I can 
              create beautiful and functional websites. I'm always looking 
              for new opportunities to learn and grow.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <Button 
              className="bg-muted hover:bg-muted-foreground/20 text-foreground border border-border"
              variant="outline"
            >
              <span className="mr-2">🟢</span>
              Available for Hire
            </Button>
            
            <Button 
              variant="outline"
              className="border-border hover:bg-muted"
              onClick={() => window.open("mailto:ruffgreenw@gmail.com", "_blank")}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Me
            </Button>
          </div>

          {/* Tech Stack Icons */}
          <div className="flex items-center gap-4 pt-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-muted rounded border border-border flex items-center justify-center">
                <span className="text-xs font-mono">JS</span>
              </div>
              <span className="text-sm text-muted-foreground">JavaScript</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-muted rounded border border-border flex items-center justify-center">
                <span className="text-xs font-mono">PY</span>
              </div>
              <span className="text-sm text-muted-foreground">Python</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-muted rounded border border-border flex items-center justify-center">
                <span className="text-xs font-mono">BC</span>
              </div>
              <span className="text-sm text-muted-foreground">Blockchain</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

