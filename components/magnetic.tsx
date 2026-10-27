'use client'

import { useRef, type ReactNode, type PointerEvent } from 'react'

/** Wrapper that gently pulls its child toward the pointer. Disabled for reduced motion / touch. */
export function Magnetic({ children, strength = 0.28, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  const enabled = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function onMove(e: PointerEvent<HTMLSpanElement>) {
    const el = ref.current
    if (!el || !enabled()) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`magnetic inline-block ${className}`}>
      {children}
    </span>
  )
}
