"use client"

import { cn } from "@/lib/utils"

interface SvgIconProps {
  src: string
  className?: string
  size?: number | string
}

export function SvgIcon({ src, className, size = 16 }: SvgIconProps) {
  return (
    <img 
      src={src} 
      alt="" 
      className={cn("inline-block brightness-0 invert", className)}
      style={{ width: size, height: size }}
    />
  )
}