"use client"

import { ProjectCard } from "@/components/project-card"

const projects = [
  {
    title: "Auto Newsletter",
    description: "Smart automotive news delivered daily. Get personalized automotive news digests, trend analytics, and real-time notifications about the latest industry developments directly to your email-inbox and the platform dashboard.",
    imageUrl: "/carnews.jpg",
    siteUrl: "https://auto-newsletter.com/"
  },
  {
    title: "NoExplorer",
    description: "Open-source, privacy-first search that learns from your intent—without learning about you. A modern search engine that prioritizes user privacy while delivering intelligent results.",
    imageUrl: "/bg-logo.svg",
    siteUrl: "https://noexplorer.vercel.app/"
  },
  {
    title: "SO Group",
    description: "Turnkey apartment renovation. Designer apartment renovation in Rostov-on-Don. Full process control, material selection and procurement, warranty up to 3 years. Professional construction services.",
    imageUrl: "/slider-4.jpg",
    siteUrl: "https://sogroup-one.vercel.app/"
  }
]

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen py-16 pb-24 overflow-hidden">
      {/* Background Ripple Effect */}
      <div className="absolute inset-0 w-full h-full">
        {/* Side darkening overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background from-0% via-transparent via-50% to-background to-100% opacity-90"></div>
      </div>
      
      {/* Content with relative positioning */}
      <div className="relative z-10 container px-4 mx-auto max-w-6xl">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground mb-4">Projects</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of my work spanning blockchain development, web applications, 
              AI integration, and various experimental projects. Each project represents 
              learning, experimentation, and practical problem-solving.
            </p>
          </div>

          {/* Projects List */}
          <div className="space-y-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                siteUrl={project.siteUrl}
                className="max-w-4xl mx-auto"
              />
            ))}
          </div>

          {/* Footer Note */}
          <div className="text-center pt-8">
            <p className="text-sm text-muted-foreground">
              More projects available on my{" "}
              <a 
                href="https://github.com/ruffbuff" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}