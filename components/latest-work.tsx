"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, ExternalLink, Star, GitFork } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

type Repository = {
  name: string
  description: string
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  updated_at: string
}

export function LatestWork() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://api.github.com/users/ruffbuff/repos?sort=updated&per_page=4")

        if (!response.ok) {
          throw new Error("Failed to fetch repositories")
        }

        const data = await response.json()
        setRepos(data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching repositories:", err)
        setError("Failed to load latest projects")
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

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

  const languageColors: Record<string, string> = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-500",
    Python: "bg-green-500",
    Solidity: "bg-purple-600",
    HTML: "bg-orange-500",
    CSS: "bg-blue-400",
    Ruby: "bg-red-500",
    Go: "bg-blue-300",
    Java: "bg-red-400",
    "C#": "bg-green-600",
    PHP: "bg-indigo-400",
    Swift: "bg-orange-600",
    Kotlin: "bg-purple-500",
    Rust: "bg-orange-700",
    C: "bg-gray-500",
    "C++": "bg-pink-500",
  }

  return (
    <section id="latest-work" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-primary/10 backdrop-blur-sm rounded-full mb-4">
            <span className="text-primary font-medium">GitHub Projects</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            Latest Work
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Check out my most recent projects and contributions on GitHub. These represent my current focus and areas of
            expertise.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {loading ? (
            // Skeleton loaders while fetching data
            Array(2)
              .fill(0)
              .map((_, index) => (
                <Card
                  key={index}
                  className="border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-14 rounded-full" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between w-full">
                      <Skeleton className="h-9 w-24 rounded-md" />
                      <div className="flex gap-4">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))
          ) : error ? (
            <div className="col-span-full text-center text-muted-foreground">{error}</div>
          ) : (
            repos.slice(0, 2).map((repo) => (
              <motion.div key={repo.name} variants={itemVariants}>
                <Card className="h-full border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold">{repo.name}</CardTitle>
                      <div className="flex items-center space-x-1 text-sm">
                        <span className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center ml-3">
                          <GitFork className="h-4 w-4 mr-1 text-muted-foreground" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                    <CardDescription className="mt-2">{repo.description || "No description provided"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.language && (
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full mr-1 ${languageColors[repo.language] || "bg-gray-400"}`}
                          />
                          <span className="text-sm">{repo.language}</span>
                        </div>
                      )}
                      {repo.topics &&
                        repo.topics.slice(0, 3).map((topic) => (
                          <Badge key={topic} variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {topic}
                          </Badge>
                        ))}
                    </div>
                    <div className="text-sm text-muted-foreground">Updated on {formatDate(repo.updated_at)}</div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(repo.html_url, "_blank")}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </Button>
                      {repo.homepage && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => window.open(repo.homepage, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-primary/20 hover:bg-primary/5 transition-all duration-300"
            onClick={() => window.open("https://github.com/ruffbuff?tab=repositories", "_blank")}
          >
            <Github className="h-5 w-5 mr-2" />
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}

