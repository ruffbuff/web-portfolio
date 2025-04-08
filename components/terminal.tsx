"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { TerminalIcon, Circle } from "lucide-react"

export function Terminal() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [text, setText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const fullText = `
> const developer = {
>   name: "RuffBuff",
>   skills: ["Blockchain", "Web Development", "Telegram Bots"],
>   experience: 5,
>   passion: "Building innovative solutions",
>   currentFocus: "Exploring new blockchain technologies"
> };
> 
> function hire(dev) {
>   return \`Hire \${dev.name} for your next \${dev.skills.join(", ")} project!\`;
> }
> 
> console.log(hire(developer));
> // Output: Hire RuffBuff for your next Blockchain, Web Development, Telegram Bots project!
  `.trim()

  const typingSpeed = 30 // ms per character
  const typingRef = useRef<NodeJS.Timeout | null>(null)

  // Typing effect
  useEffect(() => {
    if (inView && text.length < fullText.length) {
      typingRef.current = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1))
      }, typingSpeed)

      return () => {
        if (typingRef.current) clearTimeout(typingRef.current)
      }
    }
  }, [inView, text, fullText])

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto my-16 px-4"
    >
      <div className="bg-zinc-900 rounded-lg shadow-xl overflow-hidden border border-zinc-700">
        {/* Terminal header */}
        <div className="bg-zinc-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Circle className="h-3 w-3 fill-red-500 text-red-500" />
            <Circle className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <Circle className="h-3 w-3 fill-green-500 text-green-500" />
          </div>
          <div className="flex items-center text-zinc-400 text-sm">
            <TerminalIcon className="h-4 w-4 mr-2" />
            <span>ruffbuff@portfolio ~ </span>
          </div>
          <div className="w-16"></div> {/* Spacer for balance */}
        </div>

        {/* Terminal content */}
        <div className="p-4 font-mono text-sm text-green-400 overflow-x-auto">
          <pre className="whitespace-pre-wrap">
            {text}
            {cursorVisible && <span className="animate-pulse">▋</span>}
          </pre>
        </div>
      </div>
    </motion.div>
  )
}

