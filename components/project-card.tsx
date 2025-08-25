"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  imageUrl?: string
  siteUrl?: string
  repoUrl?: string
  className?: string
}

export function ProjectCard({
  title,
  description,
  imageUrl = "/placeholder-project.png",
  siteUrl,
  repoUrl,
  className
}: ProjectCardProps) {
  const handleClick = () => {
    const url = siteUrl || repoUrl
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 border-border/40",
        className
      )}
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative md:w-1/2 aspect-video md:aspect-auto overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none bg-muted">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {siteUrl && (
                <div className="p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/40">
                  <ExternalLink className="w-4 h-4" />
                </div>
              )}
              {repoUrl && (
                <div className="p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/40">
                  <Github className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
          
          {/* Content Section */}
          <div className="md:w-1/2 p-6 flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}