"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"

export function Hero() {
  const { t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Blockchain-inspired animated background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let connections: Connection[] = []

    // Define Particle class first
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(100, 100, 255, 0.5)"
        ctx.fill()
      }
    }

    class Connection {
      particleA: Particle
      particleB: Particle
      distance: number

      constructor(particleA: Particle, particleB: Particle) {
        this.particleA = particleA
        this.particleB = particleB
        this.distance = 0
      }

      update() {
        const dx = this.particleA.x - this.particleB.x
        const dy = this.particleA.y - this.particleB.y
        this.distance = Math.sqrt(dx * dx + dy * dy)
      }

      draw() {
        if (!ctx) return
        if (this.distance < 150) {
          ctx.beginPath()
          ctx.moveTo(this.particleA.x, this.particleA.y)
          ctx.lineTo(this.particleB.x, this.particleB.y)
          const opacity = 1 - this.distance / 150
          ctx.strokeStyle = `rgba(100, 100, 255, ${opacity * 0.2})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    // Now define functions that use the classes
    function initParticles() {
      particles = []
      connections = []

      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100)

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }

      // Create connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          connections.push(new Connection(particles[i], particles[j]))
        }
      }
    }

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Update and draw connections
      connections.forEach((connection) => {
        connection.update()
        connection.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background/90" />

      <div className="container relative z-10 px-4 text-center flex flex-col items-center justify-center flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-block mb-4 px-4 py-1 bg-primary/10 backdrop-blur-sm rounded-full">
            <span className="text-primary font-medium">Blockchain & IT Solutions</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            Web Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">RuffBuff - Blockchain & IT Developer</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:shadow-xl"
              onClick={() => {
                document.getElementById("latest-work")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {t("hero.cta")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-primary/20 hover:bg-primary/5 transition-all duration-300"
              onClick={() => {
                window.open("https://github.com/ruffbuff", "_blank")
              }}
            >
              GitHub Profile
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

