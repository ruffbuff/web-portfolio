"use client"

import { useLanguage } from "@/components/language-provider"
import { Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CVPage() {
  const { t, language } = useLanguage()

  const handleDownload = () => {
    const cvUrl = language === 'ru' ? '/cv/cv_ru.pdf' : '/cv/cv_en.pdf'
    const link = document.createElement('a')
    link.href = cvUrl
    link.download = `RuffBuff_CV_${language.toUpperCase()}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Curriculum Vitae</h1>
              <p className="text-muted-foreground italic">My resume</p>
            </div>
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              {t("cv.download")}
            </Button>
          </div>

          {/* CV Content */}
          <div className="space-y-8">
            {/* Personal Info */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">RuffBuff</h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><span className="text-foreground font-medium">Age:</span> 23 years old</p>
                <p><span className="text-foreground font-medium">Location:</span> Estonia, Europe</p>
                <p><span className="text-foreground font-medium">Role:</span> Full Stack Developer & Blockchain Engineer</p>
                <p><span className="text-foreground font-medium">Status:</span> Available for hire</p>
              </div>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Contact Information</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><span className="text-foreground font-medium">Email:</span> ruffgreenw@gmail.com</p>
                <p><span className="text-foreground font-medium">Telegram:</span> @ruffbuff</p>
                <p><span className="text-foreground font-medium">GitHub:</span> github.com/ruffbuff</p>
                <p><span className="text-foreground font-medium">Twitter:</span> @RuffBuff_</p>
              </div>
            </div>

            {/* Education & Certifications */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Education & Certifications</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-primary">Full Stack Web Development Specialization</h4>
                    <span className="text-xs text-muted-foreground">2022 - 2023</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive program covering modern web development technologies including React, Node.js, databases, 
                    and deployment strategies. Graduated with distinction and completed 12 real-world projects.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-primary">Blockchain & Smart Contract Development</h4>
                    <span className="text-xs text-muted-foreground">2023 - 2024</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Advanced certification in Solidity programming, DeFi protocols, and blockchain architecture. 
                    Focus on security best practices, gas optimization, and integration with Chainlink oracles.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">Computer Science & Systems Engineering</h4>
                    <span className="text-xs text-muted-foreground">2019 - 2023</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Self-directed learning program focusing on algorithms, data structures, system design, 
                    and software engineering principles. Emphasis on practical application and project-based learning.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">AI/ML Integration Certification</h4>
                    <span className="text-xs text-muted-foreground">2024 - Present</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Current specialization in artificial intelligence and machine learning integration with web applications. 
                    Focus on practical AI implementation, model optimization, and ethical AI development.
                  </p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Technical Skills</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Core Programming Languages</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><span className="text-primary font-semibold">Python</span> - Backend development, automation, AI/ML integration</p>
                    <p><span className="text-primary font-semibold">JavaScript/TypeScript</span> - Full-stack development, modern frameworks</p>
                    <p><span className="text-primary font-semibold">Solidity</span> - Smart contract development, DeFi protocols</p>
                    <p><span className="text-primary font-semibold">C++, Lua, Bash</span> - Systems programming and scripting</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Frontend & Frameworks</h4>
                  <p className="text-sm text-muted-foreground">
                    React.js, Next.js 15, Vite, TailwindCSS, Framer Motion, Web3 integration, 
                    Responsive design, Performance optimization
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Backend & Databases</h4>
                  <p className="text-sm text-muted-foreground">
                    Node.js, Supabase, NeonDB, MySQL, PostgreSQL, Drizzle ORM, Prisma, 
                    RESTful APIs, GraphQL, Authentication systems
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">DevOps & Tools</h4>
                  <p className="text-sm text-muted-foreground">
                    Arch Linux, Docker, Git, GitHub Actions, Vercel, Netlify, Postman, 
                    DataGrip, Neovim, CI/CD pipelines
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Blockchain & Web3</h4>
                  <p className="text-sm text-muted-foreground">
                    Smart contract development, Chainlink integration, DeFi protocols, 
                    Polygon blockchain, Web3.js, Ethereum ecosystem
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">AI & Emerging Technologies</h4>
                  <p className="text-sm text-muted-foreground">
                    AI model integration, Machine Learning workflows, WebAssembly, 
                    Exploring: Rust, Go, C#, Unreal Engine, Blender
                  </p>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Languages</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><span className="text-foreground font-medium">Russian:</span> Native speaker</p>
                <p><span className="text-foreground font-medium">Estonian:</span> Fluent (B2+ level)</p>
                <p><span className="text-foreground font-medium">English:</span> Advanced (B1 level)</p>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Professional Experience</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-primary">Senior Full Stack Developer</h4>
                    <span className="text-xs text-muted-foreground">2024 - Present</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Leading full-stack development projects with focus on performance optimization and user experience. 
                    Architected and deployed scalable web applications, implemented CI/CD pipelines, and mentored junior developers.
                    Achieved 20% performance improvements and 15% conversion rate increases through strategic optimizations.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-primary">Blockchain Engineer & Smart Contract Developer</h4>
                    <span className="text-xs text-muted-foreground">2023 - 2024</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Specialized in developing secure and efficient smart contracts using Solidity. 
                    Integrated Chainlink oracles and automation systems for DeFi protocols. 
                    Successfully delivered multiple blockchain projects with zero security vulnerabilities.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">Freelance Developer & Consultant</h4>
                    <span className="text-xs text-muted-foreground">2022 - Present</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Providing comprehensive development services including web applications, automation solutions, 
                    and AI integration. Successfully completed 50+ projects for international clients with 100% satisfaction rate.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">Frontend Developer & Systems Analyst</h4>
                    <span className="text-xs text-muted-foreground">2018 - 2022</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Started career in web development focusing on responsive design and user interface optimization. 
                    Gained expertise in modern frameworks and agile development methodologies while working on diverse projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Hackathons & Achievements */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Hackathons & Notable Projects</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-primary">🏆 Constellation Hackathon 2023 - Winner</h4>
                    <a 
                      href="https://github.com/ruffbuff/Hackathon-2023-DynamicAI" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Developed "DynamicAI" - An innovative blockchain-based AI solution that integrates machine learning 
                    with smart contracts. Won first place among 200+ participants for technical innovation and implementation quality.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-primary">🎮 BlockMagic Hackathon 2024 - Finalist</h4>
                    <a 
                      href="https://github.com/ruffbuff/Hackathon-2024-OnChainTTT" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Created "OnChainTTT" - A fully decentralized Tic-Tac-Toe game on Polygon blockchain. 
                    Implemented Chainlink VRF for provably fair randomness and automated game state management. 
                    Secured top 10 position in competitive gaming track.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}