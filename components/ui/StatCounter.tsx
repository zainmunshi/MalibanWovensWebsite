'use client'

import { useEffect, useRef, useState } from 'react'

export default function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el) } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: 'clamp(36px, 3.5vw, 56px)',
      letterSpacing: '-0.04em',
      color: '#ffffff',
      lineHeight: 1,
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(10px)',
      transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
    }}>
      {value}
    </div>
  )
}