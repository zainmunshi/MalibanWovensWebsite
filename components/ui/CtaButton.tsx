'use client'

import Link from 'next/link'

export default function CtaButton() {
  return (
    <Link
      href="/contact"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: '#4284b2', color: '#fff',
        fontWeight: 600, fontSize: 14,
        padding: '14px 32px', borderRadius: 7,
        textDecoration: 'none',
        transition: 'background 0.2s, transform 0.15s',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.background = '#3a73a0'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.background = '#4284b2'
        ;(e.currentTarget as HTMLElement).style.transform = 'none'
      }}
    >
      Get in Touch
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  )
}