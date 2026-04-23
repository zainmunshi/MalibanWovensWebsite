'use client'

import { useRef } from 'react'

export default function ProductHover({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      style={{ overflow: 'hidden', position: 'relative', minHeight: 480 }}
      onMouseEnter={() => {
        const img = ref.current?.querySelector('.prod-img') as HTMLElement
        if (img) img.style.transform = 'scale(1.05)'
      }}
      onMouseLeave={() => {
        const img = ref.current?.querySelector('.prod-img') as HTMLElement
        if (img) img.style.transform = 'scale(1.0)'
      }}
    >
      {children}
    </div>
  )
}