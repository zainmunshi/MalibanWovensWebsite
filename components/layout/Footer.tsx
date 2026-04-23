"use client"

import Link from 'next/link'
import { NAV_LINKS, CERTIFICATIONS } from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: '#080c10', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>

      {/* Top border accent */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, #4284b2, #67a0bb 40%, transparent 70%)' }} />

      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '72px 24px 48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 48,
      }} className="footer-grid">

        {/* Brand */}
        <div style={{ gridColumn: 'span 1' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, textDecoration: 'none' }}>
            <img
              src="/logos/MalibanLogo.png"
              alt="Maliban Wovens"
              style={{
                height: 40,
                width: 40,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 15,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}>
              Maliban Wovens
            </span>
          </Link>

          <p style={{
            fontSize: 13, lineHeight: 1.7,
            marginBottom: 24, color: 'rgba(255,255,255,0.45)',
          }}>
            Established 1974. Sri Lanka's leading woven garment manufacturer.
            Part of the EAM Maliban Group.
          </p>

          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em',
          }}>
            COLOMBO · SRI LANKA
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
            color: '#67a0bb', textTransform: 'uppercase', marginBottom: 20,
          }}>
            Company
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <div style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
            color: '#67a0bb', textTransform: 'uppercase', marginBottom: 20,
          }}>
            Products
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Formal Trousers', 'Cargo Pants', 'Chinos', 'Shorts', 'Skirts', 'Blazers', 'Suiting'].map(p => (
              <Link
                key={p}
                href="/capabilities"
                style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
              >
                {p}
              </Link>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
            color: '#67a0bb', textTransform: 'uppercase', marginBottom: 20,
          }}>
            Certifications
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {CERTIFICATIONS.slice(0, 6).map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: '#67a0bb', flexShrink: 0,
                }} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        maxWidth: 1280, margin: '0 auto',
        padding: '24px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
          © {year} Maliban Wovens Pvt Ltd. All rights reserved.
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link
            href="/privacy"
            style={{
              fontSize: 12, color: 'rgba(255,255,255,0.25)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
            onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.25)'}
          >
            Privacy Policy
          </Link>
          <span style={{
            fontSize: 12, fontFamily: 'var(--font-mono)',
            color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em',
          }}>
            EAM MALIBAN GROUP
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}