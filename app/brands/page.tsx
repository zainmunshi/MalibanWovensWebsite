'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const BUYER_SHARE = [
  { name: 'PVH Corp',        brands: 'Tommy Hilfiger · Calvin Klein', share: 34.8, region: 'USA', tier: 'anchor' },
  { name: 'Eddie Bauer',     brands: 'Eddie Bauer',                   share: 23.1, region: 'USA', tier: 'anchor' },
  { name: 'Gap Inc',         brands: 'Gap · Banana Republic',         share: 22.5, region: 'USA', tier: 'anchor' },
  { name: 'M&S',             brands: 'Marks & Spencer',               share: 7.9,  region: 'UK',  tier: 'key' },
  { name: 'Gurteen',         brands: 'Gurteen',                       share: 4.2,  region: 'UK',  tier: 'key' },
  { name: 'Gant',            brands: 'Gant',                          share: 3.9,  region: 'EU',  tier: 'key' },
  { name: 'CCC',             brands: 'Charles Tyrwhitt · Reiss',      share: 2.1,  region: 'UK',  tier: 'growing' },
  { name: 'Michael Kors',    brands: 'Michael Kors',                  share: 0.5,  region: 'USA', tier: 'growing' },
  { name: 'Brooks Brothers', brands: 'Brooks Brothers',               share: 0.5,  region: 'USA', tier: 'growing' },
  { name: 'Fat Face',        brands: 'Fat Face',                      share: 0.5,  region: 'UK',  tier: 'growing' },
]

const BRANDS_LIST = [
  { name: 'GAP',              category: 'Casual & Denim',      market: 'USA', year: '1969' },
  { name: 'Banana Republic',  category: 'Smart Casual',        market: 'USA', year: '1978' },
  { name: 'Tommy Hilfiger',   category: 'Premium Casual',      market: 'USA', year: '1985' },
  { name: 'Calvin Klein',     category: 'Contemporary',        market: 'USA', year: '1968' },
  { name: 'Eddie Bauer',      category: 'Outdoor & Heritage',  market: 'USA', year: '1920' },
  { name: 'Marks & Spencer',  category: 'Premium High-Street', market: 'UK',  year: '1884' },
  { name: 'Gant',             category: 'Preppy / Lifestyle',  market: 'EU',  year: '1949' },
  { name: 'Michael Kors',     category: 'Luxury Accessible',   market: 'USA', year: '1981' },
  { name: 'Charles Tyrwhitt', category: 'British Tailoring',   market: 'UK',  year: '1986' },
  { name: 'Reiss',            category: 'Contemporary Luxury', market: 'UK',  year: '1971' },
  { name: 'Brooks Brothers',  category: 'American Heritage',   market: 'USA', year: '1818' },
  { name: 'Fat Face',         category: 'Lifestyle Casual',    market: 'UK',  year: '1988' },
  { name: 'Gurteen',          category: 'Classic Tailoring',   market: 'UK',  year: '1905' },
]

function AnimatedBar({ share, tier, delay }: { share: number; tier: string; delay: number }) {
  const [filled, setFilled] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => setFilled(true), delay); io.disconnect() }
    }, { threshold: 0.3 })
    io.observe(el); return () => io.disconnect()
  }, [delay])
  const bg = tier === 'anchor' ? '#0a0a0a' : tier === 'key' ? '#555' : '#bbb'
  return (
    <div ref={ref} style={{ height: 1, background: '#e8e4df', overflow: 'hidden', marginTop: 10 }}>
      <div style={{
        height: '100%', background: bg,
        width: filled ? `${(share / 34.8) * 100}%` : '0%',
        transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }} />
    </div>
  )
}

export default function BrandsPage() {
  useReveal()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400&display=swap');

        .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .reveal.visible { opacity: 1; transform: none; }

        @keyframes slide-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
        @keyframes fade-in  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes marquee  { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .marquee-track { animation: marquee 40s linear infinite; display: flex; white-space: nowrap; }
        .marquee-track:hover { animation-play-state: paused; }

        .brand-row { border-top: 1px solid #e8e4df; transition: background 0.2s; }
        .brand-row:hover { background: #f5f2ee; }
        .brand-row:hover .row-num { opacity: 1 !important; }

        .mag-img { background: #e8e4df; display: flex; align-items: center; justify-content: center; color: #b8b2a9; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.1em; }
      `}</style>

      {/* ── MASTHEAD ──────────────────────────────────────────── */}
      <section style={{
        background: '#faf9f7', borderBottom: '3px solid #0a0a0a',
        paddingTop: 140, paddingBottom: 0, overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

          {/* Issue bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginBottom: 52, animation: 'fade-in 0.6s ease both',
          }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999' }}>
              Maliban Wovens — Our Partners
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999' }}>
              Est. 1974 · Sri Lanka
            </span>
          </div>

          {/* Hero headline */}
          <div style={{ position: 'relative', paddingBottom: 0 }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(60px, 11vw, 156px)',
              fontWeight: 900, lineHeight: 0.92,
              color: '#0a0a0a', letterSpacing: '-0.04em',
              margin: 0,
              animation: 'slide-up 1s cubic-bezier(0.16,1,0.3,1) 0.1s both',
            }}>
              The Brands<br />
              <em>That Trust Us</em>
            </h1>

            {/* Floating counter — top right */}
            <div style={{
              position: 'absolute', right: 0, bottom: 0,
              textAlign: 'right',
              animation: 'fade-in 0.8s ease 0.6s both',
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 900,
                color: '#0a0a0a', lineHeight: 1, letterSpacing: '-0.04em',
              }}>13</div>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999',
              }}>Global Brands</div>
            </div>
          </div>

          {/* Stat strip */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            marginTop: 64, borderTop: '1px solid #e8e4df',
            paddingTop: 24, paddingBottom: 32,
            animation: 'fade-in 0.8s ease 0.4s both',
          }}>
            {[
              { v: '11.4M', l: 'Units annually' },
              { v: '55 / 45', l: 'USA / EU-UK split' },
              { v: '50+', l: 'Years of expertise' },
            ].map((s, i) => (
              <div key={i} style={{
                borderLeft: i > 0 ? '1px solid #e8e4df' : 'none',
                paddingLeft: i > 0 ? 32 : 0,
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 700,
                  color: '#0a0a0a', lineHeight: 1, letterSpacing: '-0.02em',
                }}>{s.v}</div>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: '#999', marginTop: 6,
                }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────── */}
      <div style={{
        background: '#0a0a0a', padding: '16px 0', overflow: 'hidden',
        maskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
      }}>
        <div className="marquee-track">
          {[...BRANDS_LIST, ...BRANDS_LIST].map((b, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 28, paddingRight: 28 }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 15, fontWeight: 400, fontStyle: 'italic',
                color: 'rgba(255,255,255,0.65)', letterSpacing: '0.02em',
              }}>{b.name}</span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── EDITORIAL INTRO ───────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '0 64px', alignItems: 'start' }}>

            <div className="reveal">
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(20px, 2.8vw, 34px)', fontWeight: 400, fontStyle: 'italic',
                lineHeight: 1.45, color: '#0a0a0a', letterSpacing: '-0.01em', margin: 0,
              }}>
                "From the factory floors of Sri Lanka to the rails of the world's most
                recognisable fashion houses — every piece carries our signature."
              </p>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#999', marginTop: 28,
              }}>Maliban Wovens · Est. 1974</div>
            </div>

            <div style={{ background: '#e8e4df', alignSelf: 'stretch' }} />

            <div className="reveal" style={{ transitionDelay: '120ms' }}>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#999', marginBottom: 20,
              }}>Our Customers</div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16, fontWeight: 300, lineHeight: 1.85, color: '#444', margin: 0,
              }}>
                For over five decades, Maliban Wovens has been the silent manufacturer
                behind some of fashion's most recognisable names. We produce 11.4 million
                pieces annually — woven trousers, structured blazers, tailored jackets —
                shipped to flagship stores from New York to London.
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16, fontWeight: 300, lineHeight: 1.85,
                color: '#444', marginTop: 20,
              }}>
                Our buyers span the full spectrum of global fashion: from mass-market
                American heritage to contemporary British luxury, anchored by PVH Corp,
                Gap Inc, and Eddie Bauer — with a growing European portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANCHOR BUYERS + EDITORIAL SHOWCASE ── */}
      <section style={{ background: '#0a0a0a', padding: '96px 0 0' }}>

        {/* Section header */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div className="reveal" style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 28, marginBottom: 72,
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900, fontStyle: 'italic',
              color: '#fff', letterSpacing: '-0.03em', margin: 0, lineHeight: 1,
            }}>The Collection</h2>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
            }}>9 images · 5 brands</div>
          </div>
        </div>

        {/*
          All images ~2:3 portrait. Strategy: uniform columns per row,
          aspect-ratio drives height — no fixed px heights, no mixed fr sizes.

          Row A: 5 equal cols  — gap-1 | tommy-1 | ck-1 | ms-1 | gant-1
          Row B: 4 equal cols  — gap-2 | tommy-2 | gant-2 | gap-3
        */}
        <div style={{ padding: '0 48px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 3 }}>

            {/* ── ROW A — 5 equal columns ── */}
            <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 3 }}>
              {[
                { src: '/images/brands/gap-1.png',   alt: 'Gap',            label: 'Gap Inc',          caption: 'Woven bottoms,\neveryday wear' },
                { src: '/images/brands/tommy-1.png', alt: 'Tommy Hilfiger', label: 'Tommy Hilfiger',   caption: 'Premium casual,\nAmerican heritage' },
                { src: '/images/brands/ck-1.png',    alt: 'Calvin Klein',   label: 'Calvin Klein',     caption: 'Contemporary\nminimalism' },
                { src: '/images/brands/ms-1.png',    alt: 'M&S',            label: 'Marks & Spencer',  caption: 'British high-street,\nbuilt to last' },
                { src: '/images/brands/gant-1.png',  alt: 'Gant',           label: 'Gant',             caption: 'Preppy lifestyle,\nEuropean edge' },
              ].map((img, i) => (
                <div key={i} style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden' }}>
                  <img src={img.src} alt={img.alt} style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'top', display: 'block',
                  }} />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '40px 14px 14px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.82))',
                    pointerEvents: 'none',
                  }}>
                    <div style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 9,
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.5)', marginBottom: 5,
                    }}>{img.label}</div>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(12px, 1.1vw, 15px)', fontWeight: 700,
                      fontStyle: 'italic', color: '#fff', lineHeight: 1.25,
                      whiteSpace: 'pre-line',
                    }}>{img.caption}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── ROW B — 4 equal columns ── */}
            <div className="reveal" style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3,
              transitionDelay: '100ms',
            }}>
              {[
                { src: '/images/brands/gap-2.png',   alt: 'Gap style 2',           label: 'Gap Inc'         },
                { src: '/images/brands/tommy-2.png', alt: 'Tommy Hilfiger style 2', label: 'Tommy Hilfiger'  },
                { src: '/images/brands/gant-2.png',  alt: 'Gant style 2',          label: 'Gant'            },
                { src: '/images/brands/gap-3.png',   alt: 'Gap style 3',           label: 'Gap Inc'         },
              ].map((img, i) => (
                <div key={i} style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden' }}>
                  <img src={img.src} alt={img.alt} style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'top', display: 'block',
                  }} />
                  <div style={{
                    position: 'absolute', bottom: 14, left: 14,
                    fontFamily: "'DM Mono', monospace", fontSize: 9,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.45)',
                  }}>{img.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Buyer stats row */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 48px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {BUYER_SHARE.filter(b => b.tier === 'anchor').map((b, i) => (
              <div key={b.name} className="reveal" style={{
                transitionDelay: `${i * 100}ms`,
                padding: '32px 0', borderTop: '1px solid rgba(255,255,255,0.1)',
              }}>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)', marginBottom: 12,
                }}>{b.region}</div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(17px, 2vw, 24px)', fontWeight: 700,
                  color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 4,
                }}>{b.brands}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 300, marginBottom: 24,
                }}>via {b.name}</div>
                <AnimatedBar share={b.share} tier={b.tier} delay={i * 100 + 400} />
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900,
                  color: '#fff', letterSpacing: '-0.03em', marginTop: 14, lineHeight: 1,
                }}>{b.share}%</div>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)', marginTop: 4,
                }}>of annual volume</div>
              </div>
            ))}
          </div>
        </div>
      </section>





      {/* ── FULL BRAND DIRECTORY ─────────────────────────────── */}
      <section style={{ background: '#faf9f7', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div className="reveal" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 64, alignItems: 'end', marginBottom: 64,
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900,
              color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 0.95, margin: 0,
            }}>The Full<br /><em>Roster</em></h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16, fontWeight: 300, lineHeight: 1.8, color: '#666', margin: 0,
            }}>
              Thirteen of the world's most established fashion labels — spanning American
              heritage, British tailoring, European lifestyle, and contemporary luxury.
            </p>
          </div>

          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '40px 1fr 1fr 72px 64px',
            gap: 24, padding: '0 0 14px',
            borderBottom: '2px solid #0a0a0a',
          }}>
            {['No.', 'Brand', 'Category', 'Market', 'Est.'].map(h => (
              <div key={h} style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999',
              }}>{h}</div>
            ))}
          </div>

          {BRANDS_LIST.map((b, i) => (
            <div key={b.name} className="brand-row reveal" style={{
              display: 'grid', gridTemplateColumns: '40px 1fr 1fr 72px 64px',
              gap: 24, padding: '18px 0', alignItems: 'center',
              transitionDelay: `${i * 35}ms`,
            }}>
              <div className="row-num" style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11, color: '#bbb', opacity: 0, transition: 'opacity 0.2s',
              }}>{String(i + 1).padStart(2, '0')}</div>

              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(15px, 1.8vw, 21px)', fontWeight: 700,
                color: '#0a0a0a', letterSpacing: '-0.02em',
              }}>{b.name}</div>

              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, fontWeight: 300, color: '#777',
              }}>{b.category}</div>

              <div>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: b.market === 'USA' ? '#0a0a0a' : '#777',
                  border: `1px solid ${b.market === 'USA' ? '#0a0a0a' : '#ccc'}`,
                  padding: '3px 7px', display: 'inline-block',
                }}>{b.market}</span>
              </div>

              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12, color: '#aaa',
              }}>{b.year}</div>
            </div>
          ))}
          <div style={{ borderBottom: '2px solid #0a0a0a' }} />
        </div>
      </section>

      {/* ── MARKET SPLIT ─────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>

            {/* USA */}
            <div className="reveal" style={{ background: '#0a0a0a', padding: '64px 56px' }}>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)', marginBottom: 48,
              }}>United States</div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(72px, 10vw, 120px)', fontWeight: 900,
                color: '#fff', lineHeight: 0.85, letterSpacing: '-0.05em', marginBottom: 32,
              }}>55%</div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.8, marginBottom: 40,
              }}>
                Anchored by three of fashion's largest conglomerates — PVH Corp,
                Gap Inc, and Eddie Bauer — with duty benefits via ISFTA.
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24 }}>
                {['PVH Corp', 'Gap Inc', 'Eddie Bauer', 'Michael Kors', 'Brooks Brothers'].map(n => (
                  <div key={n} style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 15, fontStyle: 'italic', color: 'rgba(255,255,255,0.4)',
                    padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}>{n}</div>
                ))}
              </div>
            </div>

            {/* EU/UK */}
            <div className="reveal" style={{ background: '#f0ece6', padding: '64px 56px', transitionDelay: '100ms' }}>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#999', marginBottom: 48,
              }}>Europe &amp; United Kingdom</div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(72px, 10vw, 120px)', fontWeight: 900,
                color: '#0a0a0a', lineHeight: 0.85, letterSpacing: '-0.05em', marginBottom: 32,
              }}>45%</div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, fontWeight: 300, color: '#777',
                lineHeight: 1.8, marginBottom: 40,
              }}>
                A strong British-European presence. Sri Lanka's GSP status grants
                0% import duty on qualifying garments into the EU market.
              </p>
              <div style={{ borderTop: '1px solid #d8d4ce', paddingTop: 24 }}>
                {['Marks & Spencer', 'Gurteen', 'Gant', 'Charles Tyrwhitt', 'Reiss', 'Fat Face'].map(n => (
                  <div key={n} style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 15, fontStyle: 'italic', color: '#999',
                    padding: '10px 0', borderBottom: '1px solid #e0dbd4',
                  }}>{n}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VOLUME BY BUYER ───────────────────────────────────── */}
      <section style={{ background: '#faf9f7', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 64 }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, fontStyle: 'italic',
              color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1, margin: 0,
            }}>Volume by Buyer</h2>
          </div>

          {BUYER_SHARE.map((b, i) => (
            <div key={b.name} className="reveal" style={{
              display: 'grid', gridTemplateColumns: '1fr auto',
              alignItems: 'start', gap: 40,
              transitionDelay: `${i * 55}ms`,
            }}>
              <div style={{ paddingBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(17px, 2.2vw, 24px)', fontWeight: 700,
                    color: '#0a0a0a', letterSpacing: '-0.02em',
                  }}>{b.name}</span>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11, letterSpacing: '0.1em', color: '#bbb',
                  }}>{b.brands}</span>
                </div>
                <AnimatedBar share={b.share} tier={b.tier} delay={i * 55 + 300} />
              </div>
              <div style={{ textAlign: 'right', minWidth: 80, paddingTop: 2 }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 900,
                  color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1,
                }}>{b.share}%</div>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: '#bbb', marginTop: 4,
                }}>{b.region}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLOSING STATEMENT ────────────────────────────────── */}
      <section style={{ background: '#0a0a0a', padding: '120px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="reveal" style={{ maxWidth: 860 }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 4.5vw, 60px)', fontWeight: 400, fontStyle: 'italic',
              lineHeight: 1.25, color: '#fff', letterSpacing: '-0.02em', margin: 0,
            }}>
              Behind every label, every seam, every perfectly pressed garment —
              there is Maliban Wovens.
            </p>
            <div style={{
              width: 60, height: 1, background: 'rgba(255,255,255,0.15)', margin: '48px 0',
            }} />
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16, fontWeight: 300, lineHeight: 1.8,
              color: 'rgba(255,255,255,0.4)',
            }}>
              Interested in sourcing? Our merchandising team responds within one business day.
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 40, flexWrap: 'wrap' }}>
              <Link href="/contact" style={{
                display: 'inline-block',
                fontFamily: "'DM Mono', monospace",
                fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#0a0a0a', background: '#fff',
                padding: '14px 32px', textDecoration: 'none',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >Send an enquiry →</Link>
              <Link href="/sustainability" style={{
                display: 'inline-block',
                fontFamily: "'DM Mono', monospace",
                fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '14px 32px', textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
              >View certifications →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}