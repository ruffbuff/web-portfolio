'use client'

import { useEffect, useRef } from 'react'

/** Soft page-wide glow + a lagging ring that grows over interactive elements. Fine pointers only. */
export function CursorFx() {
  const glow = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    document.documentElement.classList.add('has-cursor-fx')
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 3
    let gx = tx
    let gy = ty
    let rx = tx
    let ry = ty
    let raf = 0

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      const t = e.target as Element | null
      const hot = !!t?.closest?.('a, button, [data-cursor="hot"]')
      ring.current?.classList.toggle('is-hot', hot)
    }
    const onLeave = () => ring.current?.classList.add('is-hidden')
    const onEnter = () => ring.current?.classList.remove('is-hidden')

    const tick = () => {
      gx += (tx - gx) * 0.08
      gy += (ty - gy) * 0.08
      rx += (tx - rx) * 0.22
      ry += (ty - ry) * 0.22
      if (glow.current) glow.current.style.transform = `translate3d(${gx}px, ${gy}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)
    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor-fx')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
    }
  }, [])

  return (
    <>
      <div ref={glow} className="cursor-glow" aria-hidden />
      <div ref={ring} className="cursor-ring is-hidden" aria-hidden />
    </>
  )
}
