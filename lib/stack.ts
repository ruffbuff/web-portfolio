// Tech stack shown as two running lines on the home page (it replaces the old /skills "Stack" block).
// Add a technology: put one more entry into a row. Brand icons come from `simple-icons`;
// for things without a brand mark use a lucide icon (`lucide`).
import type { LucideIcon } from "lucide-react"
import { BrainCircuit, Hash } from "lucide-react"
import type { SimpleIcon } from "simple-icons"
import {
  siArchlinux, siBlender, siChainlink, siCplusplus, siDatagrip, siDocker, siDrizzle, siEthereum, siGit, siGithub, siGo,
  siGnubash, siJavascript, siLua, siMysql, siNetlify, siNextdotjs, siNeon, siNeovim, siNodedotjs, siOpenjdk, siPostgresql,
  siPostman, siPrisma, siPython, siReact, siRust, siSolidity, siSupabase, siTailwindcss, siTypescript, siUbuntu,
  siUnrealengine, siVercel, siVite, siWebassembly,
} from "simple-icons"

export type StackItem = { name: string; icon?: SimpleIcon; lucide?: LucideIcon }

/** Languages and frameworks (+ what is being explored). */
export const stackTop: StackItem[] = [
  { name: "Python", icon: siPython },
  { name: "TypeScript", icon: siTypescript },
  { name: "JavaScript", icon: siJavascript },
  { name: "Solidity", icon: siSolidity },
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "Vite", icon: siVite },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Web3", icon: siEthereum },
  { name: "Chainlink", icon: siChainlink },
  { name: "C++", icon: siCplusplus },
  { name: "Lua", icon: siLua },
  { name: "Bash", icon: siGnubash },
  { name: "Go", icon: siGo },
  { name: "Rust", icon: siRust },
  { name: "C#", lucide: Hash },
  { name: "Java", icon: siOpenjdk },
  { name: "WebAssembly", icon: siWebassembly },
]

/** Databases, tools, platforms. */
export const stackBottom: StackItem[] = [
  { name: "Supabase", icon: siSupabase },
  { name: "NeonDB", icon: siNeon },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "MySQL", icon: siMysql },
  { name: "Drizzle", icon: siDrizzle },
  { name: "Prisma", icon: siPrisma },
  { name: "DataGrip", icon: siDatagrip },
  { name: "Docker", icon: siDocker },
  { name: "Git", icon: siGit },
  { name: "GitHub", icon: siGithub },
  { name: "Postman", icon: siPostman },
  { name: "Neovim", icon: siNeovim },
  { name: "Arch Linux", icon: siArchlinux },
  { name: "Ubuntu", icon: siUbuntu },
  { name: "Vercel", icon: siVercel },
  { name: "Netlify", icon: siNetlify },
  { name: "AI Models", lucide: BrainCircuit },
  { name: "Blender", icon: siBlender },
  { name: "Unreal Engine", icon: siUnrealengine },
]
