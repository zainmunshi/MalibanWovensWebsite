'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome   = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const transparent = isHome && !scrolled

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
        background: transparent ? 'transparent' : 'rgba(255,255,255,0.96)',
        backdropFilter: transparent ? 'none' : 'blur(16px)',
        WebkitBackdropFilter: transparent ? 'none' : 'blur(16px)',
        borderBottom: transparent ? '1px solid transparent' : '1px solid #e2e2de',
        boxShadow: transparent ? 'none' : '0 1px 24px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

        {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img
              src="/logos/MalibanLogo.png"
              alt="Maliban Wovens"
              style={{
                height: 50,
                width: 50,
                objectFit: 'cover',
                borderRadius: 15,
              }}
            />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: '-0.02em',
              color: transparent ? '#ffffff' : '#0f2137',
              transition: 'color 0.3s ease',
              whiteSpace: 'nowrap',
            }}>
              Maliban Wovens
            </span>
          </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="hidden-mobile">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link key={link.href} href={link.href} style={{
                padding: '6px 12px', borderRadius: 6, fontSize: 13, fontWeight: 500,
                textDecoration: 'none',
                color: transparent ? 'rgba(255,255,255,0.75)' : active ? '#0a0a0a' : '#6b6b6b',
                background: active && !transparent ? '#f7f7f5' : 'transparent',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { if (!active) (e.target as HTMLElement).style.color = transparent ? '#fff' : '#0a0a0a' }}
              onMouseLeave={e => { if (!active) (e.target as HTMLElement).style.color = transparent ? 'rgba(255,255,255,0.75)' : '#6b6b6b' }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/capabilities#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#4284b2', color: '#f1f1f1', fontWeight: 600, fontSize: 13,
            padding: '8px 18px', borderRadius: 6, textDecoration: 'none',
            transition: 'background 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#3a73a0'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#4284b2'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
          className="hidden-mobile">
            Get in Touch
          </Link>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
            color: transparent ? '#fff' : '#0a0a0a', display: 'none',
          }} className="show-mobile" aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          background: '#0f2137', borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '12px 24px 24px',
        }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '11px 0', fontSize: 15, fontWeight: 500,
              color: pathname === link.href ? '#4284b2' : 'rgba(255,255,255,0.7)',
              textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              {link.label}
            </Link>
          ))}
          <Link href="/capabilities#contact" onClick={() => setOpen(false)} style={{
            display: 'block', marginTop: 16, textAlign: 'center',
            background: '#4284b2', color: '#0f2137', fontWeight: 600, fontSize: 14,
            padding: '12px', borderRadius: 6, textDecoration: 'none',
          }}>
            Get in Touch
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
