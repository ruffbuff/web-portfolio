"use client"

import { useLanguage } from "@/components/language-provider"
import { GitHubContributions } from "@/components/github-contributions"
import { Button } from "@/components/ui/button"
import { SvgIcon } from "@/components/ui/svg-icon"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { GitHubRepo } from "@/lib/github"

export default function Home() {
  const { } = useLanguage()
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRepos()
  }, [])

  const fetchRepos = async () => {
    try {
      const response = await fetch('/api/github/repos?featured=true')
      if (response.ok) {
        const reposData = await response.json()
        setRepos(reposData)
      }
    } catch (error) {
      console.error('Error fetching repos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-16 pb-24">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="space-y-8">
          {/* Main Header */}
          <div>
            <div className="font-mono text-xs leading-none text-primary mb-4 whitespace-pre">
{`
▄▄▄  ▄• ▄▌·▄▄▄·▄▄▄ ▄▄▄▄·  ▄• ▄▌·▄▄▄·▄▄▄
▀▄ █·█▪██▌▐▄▄·▐▄▄· ▐█ ▀█▪ █▪██▌▐▄▄·▐▄▄·
▐▀▀▄ █▌▐█▌██▪ ██▪  ▐█▀▀█▄ █▌▐█▌██▪ ██▪ 
▐█•█▌▐█▄█▌██▌.██▌ .██▄▪▐█ ▐█▄█▌██▌.██▌.
.▀  ▀ ▀▀▀ ▀▀▀ ▀▀▀  ·▀▀▀▀   ▀▀▀ ▀▀▀ ▀▀▀ 
`}
            </div>
            <p className="text-muted-foreground italic">IT Developer</p>
          </div>
          
          {/* About Section */}
          <div className="text-muted-foreground">
            <div className="space-y-4">
              <div>
                <span className="text-muted-foreground">Yup! I'm a </span>
                <span className="text-primary font-semibold">Also a Blockchain Engineer</span>
                <span className="text-muted-foreground">. Big deal, right? But wait — there's more! I'm not just any developer,</span>
              </div>
              <div>
                <span className="text-muted-foreground">I'm a </span>
                <span className="text-primary font-semibold">Full Stack Developer</span>
                <span className="text-muted-foreground">. And if that wasn't enough, guess what?</span>
              </div>
              <div>
                <span className="text-muted-foreground">Maybe </span>
                <span className="text-primary font-semibold">Freelancer</span>
                <span className="text-muted-foreground">? Oh yeah, I've got that badge too!</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <p>
                I love both <span className="text-primary font-semibold">Blockchain</span> & <span className="text-primary font-semibold">Development</span>, so. That means I can 
                create functional smart contracts, same as beautiful and functional websites. I'm always looking 
                for new opportunities to learn and grow.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
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
              <SvgIcon src="/gmail.svg" size={16} className="mr-2" />
              Email Me
            </Button>
          </div>

          {/* Quick Tech Stack */}
          {/* <div className="flex items-center gap-4">
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

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-muted rounded border border-border flex items-center justify-center">
                <span className="text-xs font-mono">AI</span>
              </div>
              <span className="text-sm text-muted-foreground">AI/ML</span>
            </div>
          </div> */}

          {/* GitHub Contributions */}
          {/* NEED TO ADD YEAR SWITCHER, SO CAN SWITCH YEARS. */}
          <div className="pt-2"> 
            <GitHubContributions />
          </div>

          {/* Badges */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-muted rounded border border-border">
              <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                <span className="text-xs font-mono">💻</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Freelance</div>
                <div className="text-xs text-muted-foreground">2025 - Present</div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 bg-muted rounded border border-border">
              <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                <span className="text-xs font-mono">🎮</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">DECISON</div>
                <div className="text-xs text-muted-foreground">2022 - Jun 2024</div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 bg-muted rounded border border-border">
              <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                <span className="text-xs font-mono">⛓️</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Blockchain</div>
                <div className="text-xs text-muted-foreground">2020 - 2023</div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 bg-muted rounded border border-border">
              <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                <span className="text-xs font-mono">👷‍♀️</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Otis</div>
                <div className="text-xs text-muted-foreground">2018 - 2019</div>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Projects</h2>
            
            {isLoading ? (
              <div className="text-sm text-muted-foreground">Loading projects...</div>
            ) : (
              <div className="space-y-6">
                {repos.map((repo) => (
                  <div key={repo.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-primary">{repo.name}</h3>
                      <Link 
                        href={repo.html_url} 
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </Link>
                      {repo.homepage && (
                        <Link 
                          href={repo.homepage} 
                          target="_blank"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {repo.description || 'No description available'}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1">
                          ⭐ {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          🍴 {repo.forks_count}
                        </span>
                      )}
                      <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2 text-xs">
                      {repo.language && (
                        <span className="px-2 py-1 bg-muted rounded">{repo.language}</span>
                      )}
                      {repo.topics?.map((topic) => (
                        <span key={topic} className="px-2 py-1 bg-muted rounded">{topic}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Links */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              You can find me somewhere:
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="https://x.com/RuffBuff_" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <SvgIcon src="/x.svg" size={16} />
                Twitter
              </a>
              <a 
                href="https://github.com/ruffbuff" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <SvgIcon src="/github.svg" size={16} />
                Github
              </a>
              <a 
                href="https://t.me/ruffbuff" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <SvgIcon src="/telegram.svg" size={16} />
                Telegram
              </a>
              <a 
                href="/cv" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <SvgIcon src="/readdotcv.svg" size={16} />
                CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

