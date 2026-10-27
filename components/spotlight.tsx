'use client'

import { useRef, type CSSProperties, type ElementType, type ReactNode, type PointerEvent } from 'react'

/** Container with a pointer-following spotlight + gradient border (see .spot in globals.css). */
export function Spotlight({
  children,
  as: Tag = 'div',
  className = '',
  style,
  ...rest
}: {
  children: ReactNode
  as?: ElementType
  className?: string
  style?: CSSProperties
  [key: string]: unknown
}) {
  const ref = useRef<HTMLElement>(null)

  function onMove(e: PointerEvent<HTMLElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Tag ref={ref} onPointerMove={onMove} className={`spot ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  )
}
