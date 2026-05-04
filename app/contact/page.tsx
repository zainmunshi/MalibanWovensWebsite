'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function ContactPage() {
  useReveal()
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <main style={{
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      background: '#040d1a',
      color: '#fff',
      overflowX: 'hidden',
      minHeight: '100vh',
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanLine {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes borderTrace {
          0%   { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        .reveal {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal.visible { opacity: 1; transform: none; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        paddingTop: 'clamp(120px, 16vh, 180px)',
        paddingBottom: 'clamp(48px, 6vh, 80px)',
        overflow: 'hidden',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          pointerEvents: 'none',
        }} />

        {/* Horizontal scan line */}
        <div style={{
          position: 'absolute', top: '35%', left: 0,
          width: 200, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(26,92,56,0.8), transparent)',
          animation: 'scanLine 5s linear infinite',
          pointerEvents: 'none',
        }} />

        {/* Left glow */}
        <div style={{
          position: 'absolute', left: '-5%', top: '0%',
          width: 800, height: 800,
          background: 'radial-gradient(ellipse, rgba(26,92,56,0.16) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Right subtle glow */}
        <div style={{
          position: 'absolute', right: '-10%', bottom: '-20%',
          width: 600, height: 600,
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px, 5vw, 64px)' }}>

          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            marginBottom: 32,
            animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            <div style={{ width: 32, height: 1, background: 'linear-gradient(90deg, transparent, #1a5c38)' }} />
            <span style={{
              fontFamily: 'monospace', fontSize: 11,
              letterSpacing: '0.24em', color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
            }}>Get in Touch</span>
            <div style={{ width: 32, height: 1, background: 'linear-gradient(90deg, #1a5c38, transparent)' }} />
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(48px, 7.5vw, 104px)',
            fontWeight: 900,
            letterSpacing: '-0.042em',
            lineHeight: 0.92,
            margin: '0 0 28px',
            animation: 'fadeUp 0.7s 0.08s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            Let's build<br />
            <span style={{
              color: '#1a5c38',
              WebkitTextStroke: '0px',
              textShadow: '0 0 80px rgba(26,92,56,0.5)',
            }}>something</span><br />
            together.
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.42)',
            maxWidth: 520,
            margin: 0,
            animation: 'fadeUp 0.7s 0.16s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            Whether you're a buyer seeking a manufacturing partner, planning a
            factory audit, or exploring our sustainability credentials — fill
            in the form and we'll be in touch within 1–2 business days.
          </p>

          {/* Floating stat pills */}
          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 36,
            animation: 'fadeUp 0.7s 0.24s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            {[
              { label: '50+ years', sub: 'in manufacturing' },
              { label: '7 locations', sub: 'across Sri Lanka' },
              { label: '10.8M units', sub: 'annual capacity' },
              { label: '1–2 days', sub: 'response time' },
            ].map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 40,
              }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1a5c38', boxShadow: '0 0 8px #1a5c38', animation: 'pulseGlow 2s ease-in-out infinite', animationDelay: `${i * 0.3}s` }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{p.label}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{p.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ────────────────────────────────────────── */}
      <section style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '20px clamp(24px, 5vw, 64px) 140px',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 0.6fr)',
        gap: 'clamp(40px, 5vw, 64px)',
        alignItems: 'start',
      }}>

        {/* ── FORM COLUMN ────────────────────────────────────────── */}
        <div className="reveal">

          {/* Chrome header bar above the form */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 20px',
            background: 'rgba(255,255,255,0.03)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px 16px 0 0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Traffic-light dots */}
              <div style={{ display: 'flex', gap: 6 }}>
                {['rgba(255,95,86,0.7)', 'rgba(255,189,46,0.7)', 'rgba(39,201,63,0.7)'].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)', margin: '0 4px' }} />
              <span style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                Contact · Maliban Wovens
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a5c38', animation: 'pulseGlow 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.1em', color: 'rgba(26,92,56,0.8)', textTransform: 'uppercase' }}>Secure</span>
            </div>
          </div>

          {/* The form wrapper */}
          <div style={{
            position: 'relative',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '0 0 16px 16px',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.015)',
          }}>

            {/* Accent line along left edge */}
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: 2, height: '100%',
              background: 'linear-gradient(180deg, #1a5c38, rgba(26,92,56,0.1) 80%, transparent)',
              pointerEvents: 'none', zIndex: 3,
            }} />

            {/* Loading state */}
            {!formLoaded && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 4,
                background: 'rgba(4,13,26,0.98)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 18,
              }}>
                {/* Animated ring */}
                <div style={{ position: 'relative', width: 56, height: 56 }}>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ position: 'absolute', inset: 0 }}>
                    <circle cx="28" cy="28" r="24" stroke="rgba(26,92,56,0.2)" strokeWidth="2" />
                    <circle cx="28" cy="28" r="24" stroke="#1a5c38" strokeWidth="2" strokeLinecap="round"
                      strokeDasharray="150"
                      style={{ animation: 'spin 1.2s linear infinite', transformOrigin: '28px 28px' }} />
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1a5c38' }} />
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                    Loading form
                  </div>
                  <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 8 }}>
                    {[0,1,2].map(i => (
                      <div key={i} style={{
                        width: 4, height: 4, borderRadius: '50%',
                        background: '#1a5c38',
                        animation: 'pulseGlow 1.2s ease-in-out infinite',
                        animationDelay: `${i * 0.2}s`,
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Invert+hue-rotate to dark-theme the Google Form */}
            <div style={{
              filter: 'invert(1) hue-rotate(180deg)',
              background: '#fff',
            }}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSeKen5Syxk-MYejBW93JekMmU9wIxSTv3pijtS5LLqF4AEOkA/viewform?embedded=true"
                width="100%"
                height="900"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                onLoad={() => setFormLoaded(true)}
                title="Maliban Wovens Contact Form"
                style={{
                  display: 'block',
                  opacity: formLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                }}
              >
                Loading…
              </iframe>
            </div>

            {/* Bottom corner accents */}
            <div style={{ position: 'absolute', bottom: 14, left: 14, width: 14, height: 14, borderBottom: '1.5px solid rgba(26,92,56,0.45)', borderLeft: '1.5px solid rgba(26,92,56,0.45)', pointerEvents: 'none', zIndex: 3 }} />
            <div style={{ position: 'absolute', bottom: 14, right: 14, width: 14, height: 14, borderBottom: '1.5px solid rgba(26,92,56,0.45)', borderRight: '1.5px solid rgba(26,92,56,0.45)', pointerEvents: 'none', zIndex: 3 }} />
          </div>

          {/* Under-form note */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginTop: 14,
            padding: '0 4px',
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="3" y="5.5" width="7" height="5.5" rx="1" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              <path d="M4.5 5.5V4a2 2 0 0 1 4 0v1.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
              All enquiries are confidential · Powered by Google Forms
            </span>
          </div>
        </div>

        {/* ── SIDEBAR ────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 24,
          position: 'sticky', top: 100,
        }}>

          {/* What to expect */}
          <div className="reveal" style={{
            padding: '28px 24px',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: 200, height: 200,
              background: 'radial-gradient(circle, rgba(26,92,56,0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 18, height: 1, background: '#1a5c38' }} />
              <span style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
                What to expect
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                {
                  step: '01',
                  title: 'We review your enquiry',
                  desc: 'Your message goes directly to the relevant team lead — merchandising, operations, or HR.',
                },
                {
                  step: '02',
                  title: 'Response within 1–2 days',
                  desc: "You'll hear back from us with next steps, availability, or further questions.",
                },
                {
                  step: '03',
                  title: 'Schedule a call or visit',
                  desc: "We'll arrange a video call or factory visit at a time that suits your team.",
                },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 14 }}>
                  <div style={{
                    flexShrink: 0,
                    width: 32, height: 32, borderRadius: 8,
                    background: 'rgba(26,92,56,0.15)',
                    border: '1px solid rgba(26,92,56,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'monospace', fontSize: 10, fontWeight: 700,
                    color: 'rgba(26,92,56,0.9)', letterSpacing: '0.05em',
                  }}>{s.step}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{s.title}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Factory visit CTA */}
          <div className="reveal" style={{
            padding: '24px 22px',
            background: 'rgba(26,92,56,0.08)',
            border: '1px solid rgba(26,92,56,0.25)',
            borderRadius: 16,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 160, height: 160, borderRadius: '50%',
              border: '1px solid rgba(26,92,56,0.15)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', top: -10, right: -10,
              width: 80, height: 80, borderRadius: '50%',
              border: '1px solid rgba(26,92,56,0.2)',
              pointerEvents: 'none',
            }} />

            <div style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(74,222,128,0.6)', marginBottom: 10 }}>
              Factory Visits
            </div>
            <h4 style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>
              Want to see the operation firsthand?
            </h4>
            <p style={{ fontSize: 12, lineHeight: 1.65, color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
              We welcome buyer visits and audits across all 7 facilities.
            </p>

            {/* Location badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
              {[
                { code: 'DK', color: '#1a5c38' },
                { code: 'IG', color: '#1a5c38' },
                { code: 'BG', color: '#1a5c38' },
                { code: 'NL', color: '#7c3aed' },
                { code: 'PM', color: '#7c3aed' },
                { code: 'PD', color: '#d97706' },
              ].map((loc) => (
                <span key={loc.code} style={{
                  padding: '3px 10px', borderRadius: 40, fontSize: 10,
                  background: `${loc.color}22`,
                  border: `1px solid ${loc.color}44`,
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'monospace', letterSpacing: '0.06em',
                }}>{loc.code}</span>
              ))}
            </div>

            <Link href="/facilities" style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontSize: 13, fontWeight: 600, color: '#4ade80', textDecoration: 'none',
              padding: '9px 16px',
              background: 'rgba(26,92,56,0.2)',
              border: '1px solid rgba(26,92,56,0.4)',
              borderRadius: 8,
              transition: 'background 0.2s',
            }}>
              Explore facilities
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Stats row */}
          <div className="reveal" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            borderRadius: 14, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            {[
              { value: '50+', label: 'Years' },
              { value: '7', label: 'Locations' },
              { value: '1–2d', label: 'Response' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '20px 10px', textAlign: 'center',
                background: i === 1 ? 'rgba(26,92,56,0.08)' : '#040d1a',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                position: 'relative',
              }}>
                {i === 1 && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#1a5c38', opacity: 0.6 }} />}
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: i === 1 ? '#4ade80' : '#fff' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 4, fontFamily: 'monospace', letterSpacing: '0.08em' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER STRIP ─────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: 'clamp(40px, 5vh, 64px) clamp(24px, 5vw, 64px)',
        background: 'rgba(0,0,0,0.15)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: 24,
          }}>
            <div>
              <div style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>
                EAM Maliban Group · Est. 1974
              </div>
              <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#fff', margin: '0 0 6px' }}>
                Maliban Wovens
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
                7 integrated facilities · Sri Lanka · 10.8M units / year
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { code: 'HO', color: '#2563eb' },
                { code: 'DK', color: '#1a5c38' },
                { code: 'IG', color: '#1a5c38' },
                { code: 'BG', color: '#1a5c38' },
                { code: 'NL', color: '#7c3aed' },
                { code: 'PM', color: '#7c3aed' },
                { code: 'PD', color: '#d97706' },
              ].map((loc) => (
                <div key={loc.code} style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: `${loc.color}22`,
                  border: `1.5px solid ${loc.color}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontWeight: 700, color: loc.color, fontFamily: 'monospace',
                }}>{loc.code}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}