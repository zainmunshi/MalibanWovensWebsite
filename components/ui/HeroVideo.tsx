'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const VIDEO_SRC  = '/hero/hero.mp4'
const POSTER_SRC = '/hero/hero-poster.jpg'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onReady = () => setReady(true)
    v.addEventListener('canplaythrough', onReady)
    return () => v.removeEventListener('canplaythrough', onReady)
  }, [])

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100svh',
      minHeight: 600,
      overflow: 'hidden',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      {/* ── VIDEO ── */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: ready ? 1 : 0,
          transition: 'opacity 1.6s ease',
          filter: 'brightness(0.6) contrast(1.05)',
        }}
      />

      {/* ── OVERLAYS ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.72) 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '55%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '25%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundSize: '160px', opacity: 0.03,
        pointerEvents: 'none', mixBlendMode: 'overlay',
      }} />

      {/* ── BOTTOM CONTENT ── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 24px 80px',
        pointerEvents: 'none',
      }}>

        {/* Eyebrow */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 20, pointerEvents: 'auto',
          opacity: 0, animation: 'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both',
        }}>
          <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.5)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase',
          }}>
            Est. 1974 · Sri Lanka · Maliban Wovens
          </span>
          <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.5)' }} />
        </div>

        {/* Sub-line */}
        <p style={{
          fontSize: 'clamp(13px, 1.3vw, 15px)', lineHeight: 1.7,
          color: 'rgba(255,255,255,0.7)', fontWeight: 400,
          maxWidth: 480, margin: '0 0 36px', letterSpacing: '0.01em',
          textShadow: '0 1px 8px rgba(0,0,0,0.5)',
          pointerEvents: 'auto',
          opacity: 0, animation: 'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s both',
        }}>
          Sri Lanka's Leading Garment Manufacturer
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: 10, flexWrap: 'wrap',
          justifyContent: 'center', pointerEvents: 'auto',
          opacity: 0, animation: 'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both',
        }}>
          <Link href="/capabilities" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#ffffff', color: '#0a0a0a',
            fontWeight: 700, fontSize: 13, letterSpacing: '0.01em',
            padding: '13px 28px', borderRadius: 6, textDecoration: 'none',
          }}>
            View Capabilities
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="/about" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(255,255,255,0.35)', color: '#ffffff',
            fontWeight: 500, fontSize: 13, padding: '13px 28px',
            borderRadius: 6, textDecoration: 'none',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            background: 'rgba(255,255,255,0.08)',
          }}>
            Our Story
          </Link>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div style={{
        position: 'absolute', bottom: 28, right: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 8, zIndex: 2,
        opacity: 0, animation: 'fade-in 1s ease 1.2s both',
      }}>
        <div style={{
          width: 20, height: 32,
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 10, display: 'flex',
          justifyContent: 'center', paddingTop: 5,
        }}>
          <div style={{
            width: 2, height: 6, background: '#ffffff',
            borderRadius: 2, opacity: 0.6,
            animation: 'scroll-dot 1.8s cubic-bezier(0.45,0,0.55,1) infinite',
          }} />
        </div>
      </div>

    </section>
  )
}