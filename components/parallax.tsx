'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/** Moves children with scroll (speed) and pointer (mouse) for a layered depth effect. */
export function Parallax({ children, className = '', speed = 0.1, mouse = 0 }: { children: ReactNode; className?: string; speed?: number; mouse?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    let sy = 0
    let mx = 0
    let my = 0
    let raf = 0
    const apply = () => {
      raf = 0
      el.style.transform = `translate3d(${mx}px, ${sy + my}px, 0)`
    }
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onScroll = () => {
      sy = window.scrollY * speed * -1
      queue()
    }
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * mouse
      my = (e.clientY / window.innerHeight - 0.5) * mouse
      queue()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    if (mouse) window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed, mouse])
  return (
    <div ref={ref} className={className} aria-hidden>
      {children}
    </div>
  )
}
