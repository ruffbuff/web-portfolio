// Content of the old /cv page, moved as-is (English only: the old page had no Russian text for it).

export const cvPersonal = [
  { k: "Age", v: "23 years old" },
  { k: "Location", v: "Europe" },
  { k: "Role", v: "Full Stack Developer & Blockchain Engineer" },
  { k: "Status", v: "Available for hire" },
]

export const cvContacts = [
  { k: "Email", v: "ruffgreenw@gmail.com", href: "mailto:ruffgreenw@gmail.com" },
  { k: "Telegram", v: "@ruffbuff", href: "https://t.me/ruffbuff" },
  { k: "GitHub", v: "github.com/ruffbuff", href: "https://github.com/ruffbuff" },
  { k: "Twitter", v: "@RuffBuff_", href: "https://x.com/RuffBuff_" },
]

type Item = { title: string; period: string; text: string; highlight?: boolean }

export const cvEducation: Item[] = [
  {
    title: "Full Stack Web Development Specialization",
    period: "2022 - 2023",
    text: "Comprehensive online program covering modern web development technologies including React, Node.js, databases, and deployment strategies. Completed with distinction and built 12 real-world projects.",
    highlight: true,
  },
  {
    title: "Blockchain & Smart Contract Development",
    period: "2023 - 2024",
    text: "Advanced online certification in Solidity programming, DeFi protocols, and blockchain architecture. Focus on security best practices, gas optimization, and integration with Chainlink oracles.",
    highlight: true,
  },
  {
    title: "Self-Taught Computer Science & Systems Engineering",
    period: "2019 - Present",
    text: "Self-directed learning through online resources, documentation, and hands-on projects. Focused on algorithms, data structures, system design, and software engineering principles through practical application.",
  },
  {
    title: "AI/ML Integration Studies",
    period: "2024 - Present",
    text: "Ongoing self-study in artificial intelligence and machine learning integration with web applications. Learning through trial and error, practical AI implementation, and exploring various AI tools and frameworks.",
  },
]

export const cvCoreLanguages = [
  { name: "Python", text: "Backend development, automation, AI/ML integration" },
  { name: "JavaScript/TypeScript", text: "Full-stack development, modern frameworks" },
  { name: "Solidity", text: "Smart contract development, DeFi protocols" },
  { name: "C++, Lua, Bash", text: "Systems programming and scripting" },
]

export const cvSkillBlocks = [
  { title: "Frontend & Frameworks", text: "React.js, Next.js 15, Vite, TailwindCSS, Framer Motion, Web3 integration, Responsive design, Performance optimization" },
  { title: "Backend & Databases", text: "Node.js, Supabase, NeonDB, MySQL, PostgreSQL, Drizzle ORM, Prisma, RESTful APIs, GraphQL, Authentication systems" },
  { title: "DevOps & Tools", text: "Arch Linux, Docker, Git, GitHub Actions, Vercel, Netlify, Postman, DataGrip, Neovim, CI/CD pipelines" },
  { title: "Blockchain & Web3", text: "Smart contract development, Chainlink integration, DeFi protocols, Polygon blockchain, Web3.js, Ethereum ecosystem" },
  { title: "AI & Emerging Technologies", text: "AI model integration, Machine Learning workflows, WebAssembly, Exploring: Rust, Go, C#, Unreal Engine, Blender" },
]

export const cvSpoken = [
  { k: "Russian", v: "Native speaker" },
  { k: "Estonian", v: "Fluent (B2+ level)" },
  { k: "English", v: "Advanced (B1 level)" },
]

export const cvExperience: Item[] = [
  {
    title: "Full Stack Developer",
    period: "2024 - Present",
    text: "Developing full-stack web applications with focus on performance optimization and user experience. Building scalable applications using modern technologies, implementing deployment pipelines through self-learning and experimentation. Achieved significant performance improvements through iterative testing and optimization.",
    highlight: true,
  },
  {
    title: "Blockchain Engineer & Smart Contract Developer",
    period: "2023 - 2024",
    text: "Self-taught blockchain development, specializing in secure smart contracts using Solidity. Learned to integrate Chainlink oracles and DeFi protocols through documentation and hands-on practice. Built multiple blockchain projects by experimenting with different approaches and learning from mistakes.",
    highlight: true,
  },
  {
    title: "Freelance Developer",
    period: "2022 - Present",
    text: "Providing development services including web applications, automation solutions, and AI integration. Learning new technologies as needed for each project, adapting quickly to client requirements through self-study and practical implementation.",
  },
  {
    title: "Self-Taught Developer",
    period: "2018 - 2022",
    text: "Started programming journey through online resources and documentation. Learned web development fundamentals, modern frameworks, and development methodologies through trial and error, building various personal projects.",
  },
]

export const cvHackathons = [
  {
    icon: "Trophy" as const,
    title: "Constellation Hackathon 2023",
    href: "https://github.com/ruffbuff/Hackathon-2023-DynamicAI",
    text: 'Developed "DynamicAI" - An innovative blockchain-based AI solution that integrates machine learning with smart contracts. Won first place among 200+ participants for technical innovation and implementation quality.',
  },
  {
    icon: "Gamepad2" as const,
    title: "BlockMagic Hackathon 2024",
    href: "https://github.com/ruffbuff/Hackathon-2024-OnChainTTT",
    text: 'Created "OnChainTTT" - A fully decentralized Tic-Tac-Toe game on Polygon blockchain. Implemented Chainlink VRF for provably fair randomness and automated game state management. Secured top 10 position in competitive gaming track.',
  },
]
