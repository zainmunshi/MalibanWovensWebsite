'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

/* ─── Scroll reveal hook ─────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ─── Data ───────────────────────────────────────────────────────── */
const CARE = [
  {
    letter: 'C',
    word: 'Conscious',
    color: '#1a5c38',
    desc: 'Mindful decisions across every step of production — from fibre selection to final shipment.',
  },
  {
    letter: 'A',
    word: 'Accountability',
    color: '#1a5c38',
    desc: 'Transparent reporting, measurable KPIs, and third-party verification at every layer.',
  },
  {
    letter: 'R',
    word: 'Respect',
    color: '#1a5c38',
    desc: 'For our people, our communities, our planet, and the brands that trust us.',
  },
  {
    letter: 'E',
    word: 'Empowerment',
    color: '#1a5c38',
    desc: 'Investing in inclusive hiring, skills development, and long-term community engagement.',
  },
]

const MILESTONES = [
  { year: '2023', label: 'Baseline established', detail: 'Emissions baseline set across Scope 1, 2 & 3.' },
  { year: '2025', label: 'Sustainability KPIs live', detail: 'KPIs deployed across all 7 operational locations.' },
  { year: '2030', label: 'Emissions & energy targets', detail: '46.2% reduction in Scope 1 & 2 · 20% Scope 3 reduction · 60% renewable electricity.' },
  { year: '2050', label: 'Net Zero', detail: 'Full carbon neutrality across the entire value chain.' },
]

const OPS_ICONS: Record<string, JSX.Element> = {
  social: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  cert: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  env: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
      <path d="M8 6l4-4 4 4"/><path d="M2 12a10 10 0 0 1 10-10"/>
    </svg>
  ),
  security: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  sustain: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12a10 10 0 1 1 10 10"/><path d="M2 12h10"/><path d="M12 2v10"/>
      <path d="m4.93 4.93 5.66 5.66"/>
    </svg>
  ),
}

const PEOPLE_ICONS: Record<string, JSX.Element> = {
  medical: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  welfare: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  bereavement: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  grievance: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="7" x2="15" y2="7"/>
      <line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="12" y2="15"/>
    </svg>
  ),
}

const RESPONSIBLE_OPS = [
  { iconKey: 'social',   title: 'Social Audits',            desc: 'Labour law compliance, ethical standards and employee welfare — verified by independent third-party audits.' },
  { iconKey: 'cert',     title: 'Technical Certifications',  desc: 'Formal recognition that our processes and systems meet rigorous international quality requirements.' },
  { iconKey: 'env',      title: 'Environmental Audits',      desc: 'Assessments ensuring strict compliance with environmental laws and minimisation of ecological impact.' },
  { iconKey: 'security', title: 'Security',                  desc: 'Systematic evaluations protecting physical assets, digital infrastructure, information, and employees.' },
  { iconKey: 'sustain',  title: 'Sustainability',            desc: 'Guaranteeing present operations never compromise the environmental and social resources of the future.' },
]

const COMPLIANCE_CERTS = [
  { name: 'SMETA', sub: 'Sedex Members Ethical Trade Audit', img: '/logos/cert-smeta.jpeg' },
  { name: 'SLCP', sub: 'Social & Labor Convergence Program', img: '/logos/cert-slcp.webp' },
  { name: 'Higg Index', sub: 'Sustainable Apparel Coalition', img: '/logos/cert-higg.png' },
  { name: 'OEKO-TEX®', sub: 'Tested for harmful substances', img: '/logos/cert-oekotex.png' },
  { name: 'Regenagri®', sub: 'Regenerative agriculture standard', img: '/logos/cert-regenagri.png' },
]

const SUPPLY_CHAIN_CERTS = [
  { name: 'GOTS', sub: 'Global Organic Textile Standard', img: '/logos/cert-gots.png' },
  { name: 'GRS', sub: 'Global Recycled Standard', img: '/logos/cert-grs.webp' },
  { name: 'European Flax®', sub: 'Natural fibre traceability', img: '/logos/cert-euflax.png' },
  { name: 'OCS 100', sub: 'Organic Content Standard', img: '/logos/cert-ocs.webp' },
  { name: 'Recycled Blended Claim', sub: 'Recycled blend verification', img: '/logos/cert-rbc.png' },
  { name: 'Regenagri®', sub: 'Soil regeneration standard', img: '/logos/cert-regenagri.png' },
  { name: 'SCAN', sub: 'Supplier Compliance Audit Network', img: '/logos/cert-scan.png' },
  { name: 'Better Cotton', sub: 'Sustainable cotton sourcing', img: '/logos/cert-bettercotton.jpg' },
]

const SUPPLY_COVERAGE = [
  'Organic material verification',
  'Recycled material verification',
  'Ethical labour practices',
  'Regenerative agriculture',
  'Sustainable fibre sourcing',
]

const PEOPLE_BENEFITS = [
  { iconKey: 'medical',     title: 'Free Medical Insurance',        desc: 'Comprehensive coverage and access to medical facilities for all employees.' },
  { iconKey: 'welfare',     title: 'Welfare Shop',                  desc: 'On-site welfare shop providing subsidised essentials for the workforce.' },
  { iconKey: 'bereavement', title: 'Bereavement Support',           desc: 'Compassionate leave and financial support during personal loss.' },
  { iconKey: 'grievance',   title: 'Confidential Grievance Channel', desc: 'Secure QR-code-based platform — multilingual in English, Sinhala and Tamil — for fully confidential complaint submission.' },
]

const NET_ZERO_STATS = [
  { value: '46.2%', label: 'Scope 1 & 2 reduction target by 2030' },
  { value: '20%', label: 'Scope 3 reduction target by 2030' },
  { value: '60%', label: 'Renewable electricity by 2030' },
  { value: '2050', label: 'Net Zero target year' },
]

/* ─── Page ───────────────────────────────────────────────────────── */
export default function SustainabilityPage() {
  useReveal()

  return (
    <main style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', background: '#fff', color: '#0a1628', overflowX: 'hidden' }}>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        background: '#0a1628',
        minHeight: '72vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 120,
        paddingBottom: 80,
      }}>
        {/* grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />
        {/* radial vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 80% at 60% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* large background text */}
        <span style={{
          position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%)',
          fontSize: 'clamp(140px, 22vw, 280px)', fontWeight: 900,
          color: 'rgba(255,255,255,0.03)', lineHeight: 1,
          letterSpacing: '-0.04em', userSelect: 'none', pointerEvents: 'none',
        }}>CARE</span>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '0 40px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 32, height: 1, background: '#1a5c38' }} />
            <span style={{
              fontFamily: 'var(--font-mono, monospace)', fontSize: 11,
              letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
            }}>Planet First</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 800,
            color: '#fff', lineHeight: 1.05, letterSpacing: '-0.03em',
            maxWidth: 700, marginBottom: 28,
          }}>
            Rooting Change<br />
            <span style={{ color: '#1a5c38' }}>for a Greener Future</span>
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'rgba(255,255,255,0.6)',
            maxWidth: 560, lineHeight: 1.7, marginBottom: 48,
          }}>
            Sustainability at Maliban Wovens is not a compliance checkbox — it is embedded into
            how we manufacture, how we treat our people, and how we plan for 2050.
          </p>

          {/* CARE letters strip */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {CARE.map(c => (
              <div key={c.letter} style={{
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                padding: '10px 20px',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#1a5c38' }}>{c.letter}</span>
                <span style={{ fontSize: 12, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>{c.word}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NET ZERO STAT BAR ─────────────────────────────────────── */}
      <section style={{ background: '#1a5c38', padding: '32px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 0 }}>
          {NET_ZERO_STATS.map((s, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '0 24px',
              borderRight: i < NET_ZERO_STATS.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
            }}>
              <div style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CARE VALUES ──────────────────────────────────────────── */}
      <section style={{ padding: '100px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: '#1a5c38' }} />
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.2em', color: '#1a5c38', textTransform: 'uppercase' }}>Our Framework</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, color: '#0a1628', letterSpacing: '-0.025em', maxWidth: 600 }}>
              Everything we do is guided by <span style={{ color: '#1a5c38' }}>CARE</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {CARE.map((c, i) => (
              <div key={c.letter} className="reveal pillar-card" style={{
                background: '#f8f9fc',
                border: '1px solid #e2e2de',
                borderRadius: 12,
                padding: 36,
                transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
                animationDelay: `${i * 80}ms`,
              }}>
                <div style={{ marginBottom: 20 }}>
                  <span style={{
                    fontSize: 72, fontWeight: 900, color: '#1a5c38',
                    lineHeight: 1, display: 'block', opacity: 0.15,
                  }}>{c.letter}</span>
                  <span style={{ fontSize: 22, fontWeight: 700, color: '#0a1628', marginTop: -24, display: 'block' }}>{c.word}</span>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: '#4b5563', margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NET ZERO TIMELINE ─────────────────────────────────────── */}
      <section style={{ padding: '100px 40px', background: '#f8f9fc' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 72 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: '#1a5c38' }} />
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.2em', color: '#1a5c38', textTransform: 'uppercase' }}>Roadmap</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, color: '#0a1628', letterSpacing: '-0.025em' }}>
              Our path to <span style={{ color: '#1a5c38' }}>Net Zero by 2050</span>
            </h2>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {/* horizontal line */}
            <div style={{
              position: 'absolute', top: 28, left: 0, right: 0,
              height: 2, background: 'linear-gradient(90deg, #1a5c38, rgba(37,99,235,0.2))',
              zIndex: 0,
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, position: 'relative', zIndex: 1 }}>
              {MILESTONES.map((m, i) => (
                <div key={i} className="reveal" style={{ animationDelay: `${i * 100}ms` }}>
                  {/* dot */}
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: m.year === '2050' ? '#1a5c38' : '#fff',
                    border: `2px solid ${m.year === '2050' ? '#1a5c38' : '#d1d5db'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 24,
                    boxShadow: m.year === '2050' ? '0 0 0 8px rgba(37,99,235,0.12)' : 'none',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: 11, fontWeight: 700,
                      color: m.year === '2050' ? '#fff' : '#0a1628',
                    }}>{m.year}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#0a1628', marginBottom: 8 }}>{m.label}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.6, color: '#4b5563' }}>{m.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESPONSIBLE OPERATIONS ────────────────────────────────── */}
      <section style={{ padding: '100px 40px', background: '#0a1628' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: '#1a5c38' }} />
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Compliance Architecture</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', maxWidth: 640 }}>
              Responsible Operations Framework
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 560, lineHeight: 1.7, marginTop: 16 }}>
              Safety of people, the environment, and our products — through an uncompromising compliance architecture.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
            {RESPONSIBLE_OPS.map((op, i) => (
              <div key={i} className="reveal" style={{
                padding: '36px 28px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 8,
                animationDelay: `${i * 80}ms`,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: 'rgba(26,92,56,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#4ade80', marginBottom: 20,
                }}>
                  {OPS_ICONS[op.iconKey]}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 10 }}>{op.title}</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)' }}>{op.desc}</div>
              </div>
            ))}
          </div>

          {/* Certification badges */}
          <div className="reveal" style={{ marginTop: 56 }}>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 20 }}>
              Globally recognised platforms
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {COMPLIANCE_CERTS.map((cert, i) => (
                <div key={i} style={{
                  padding: '12px 20px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', gap: 14,
                  minWidth: 180,
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 8,
                    background: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, overflow: 'hidden',
                    padding: 4,
                  }}>
                    <img src={cert.img} alt={cert.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{cert.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2, lineHeight: 1.3 }}>{cert.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SUPPLY CHAIN VERIFICATION ─────────────────────────────── */}
      <section style={{ padding: '100px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: '#1a5c38' }} />
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.2em', color: '#1a5c38', textTransform: 'uppercase' }}>Traceability</span>
            </div>
            <h2 className="reveal" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, color: '#0a1628', letterSpacing: '-0.025em', marginBottom: 24 }}>
              Meticulous Supply Chain Verification
            </h2>
            <p className="reveal" style={{ fontSize: 16, lineHeight: 1.7, color: '#4b5563', marginBottom: 36 }}>
              Our compliance platform ensures rigorous certification oversight in every production allocation —
              driving full supply chain transparency and accountability from fibre to finished garment.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {SUPPLY_COVERAGE.map((item, i) => (
                <div key={i} className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 14, animationDelay: `${i * 60}ms` }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: '#1a5c38', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 15, color: '#0a1628', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="reveal" style={{
              background: '#f8f9fc',
              borderRadius: 16,
              padding: 40,
              border: '1px solid #e2e2de',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0a1628', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Certification Gallery</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {SUPPLY_CHAIN_CERTS.map((cert, i) => (
                  <div key={i} style={{
                    padding: '14px 16px',
                    background: '#fff',
                    border: '1px solid #e2e2de',
                    borderRadius: 8,
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    {cert.img ? (
                      <div style={{
                        width: 40, height: 40, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: '#f8f9fc', borderRadius: 6, padding: 4,
                      }}>
                        <img src={cert.img} alt={cert.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                    ) : (
                      <div style={{
                        width: 40, height: 40, flexShrink: 0,
                        background: '#e9edf7', borderRadius: 6,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 700, color: '#1a5c38', textAlign: 'center', lineHeight: 1.1,
                      }}>{cert.name.split(' ')[0]}</div>
                    )}
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#0a1628', lineHeight: 1.2 }}>{cert.name}</div>
                      <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2 }}>{cert.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PEOPLE & WELLBEING ────────────────────────────────────── */}
      <section style={{ padding: '100px 40px', background: '#f8f9fc' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 64, maxWidth: 640 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: '#1a5c38' }} />
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.2em', color: '#1a5c38', textTransform: 'uppercase' }}>Our People</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, color: '#0a1628', letterSpacing: '-0.025em' }}>
              Empowering People Through Wellbeing &amp; Workplace Transparency
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#4b5563', marginTop: 16 }}>
              Fostering open communication to ensure a transparent, fair, and respectful workplace for every employee.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {PEOPLE_BENEFITS.map((b, i) => (
              <div key={i} className="reveal pillar-card" style={{
                background: '#fff',
                border: '1px solid #e2e2de',
                borderRadius: 12,
                padding: 32,
                animationDelay: `${i * 80}ms`,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: '#edf7f1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#1a5c38', marginBottom: 20,
                }}>
                  {PEOPLE_ICONS[b.iconKey]}
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#0a1628', marginBottom: 10 }}>{b.title}</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: '#4b5563' }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 40px', background: '#0a1628' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.3)' }} />
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Get in touch</span>
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.3)' }} />
          </div>
          <h2 className="reveal" style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: 20 }}>
            Discuss our sustainability credentials
          </h2>
          <p className="reveal" style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: 48 }}>
            Our certifications, audit reports, and sustainability roadmap are available to qualified buyers on request.
            Contact our team to learn more about sourcing responsibly from Maliban Wovens.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 8,
              background: '#1a5c38', color: '#fff',
              fontWeight: 600, fontSize: 15, textDecoration: 'none',
              transition: 'background 0.2s',
            }}>
              Send an enquiry
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/certifications" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 500, fontSize: 15, textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}>
              View all certifications
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}