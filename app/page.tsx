import { Header } from "@/components/header"
import { Terminal } from "@/components/terminal"
import { LatestWork } from "@/components/latest-work"
import { Skills } from "@/components/skills"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Gallery } from "@/components/gallery"
import { CV } from "@/components/cv"
import { Footer } from "@/components/footer"
import { HomeContent } from "@/components/home-content"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HomeContent />
      <Terminal />
      <LatestWork />
      <Skills />
      <Experience />
      <Projects />
      <Gallery />
      <CV />
      <Footer />
    </main>
  )
}

