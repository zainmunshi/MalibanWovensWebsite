'use client'

import Link from 'next/link'

export default function PillarCards() {
  return (
    <>
      {/* LEFT — Scale & Reliability */}
      <div
        style={{
          gridRow: 'span 2',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 620,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          const img = e.currentTarget.querySelector('.card-img-left') as HTMLElement
          if (img) img.style.transform = 'scale(1.05)'
        }}
        onMouseLeave={e => {
          const img = e.currentTarget.querySelector('.card-img-left') as HTMLElement
          if (img) img.style.transform = 'scale(1.0)'
        }}
      >
        <div
          className="card-img-left"
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/images/pillar-scale.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.65) contrast(1.05) saturate(1.0)',
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}
        />

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.45) 55%, rgba(10,22,40,0.1) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Top-left label */}
        <div style={{
          position: 'absolute', top: 28, left: 32, zIndex: 2,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            width: 32, height: 32,
            background: 'rgba(66,132,178,0.15)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4284b2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9,
            letterSpacing: '0.12em', color: '#4284b2',
            textTransform: 'uppercase',
          }}>
            Manufacturing
          </span>
        </div>

        {/* Ghost number */}
        <div style={{
          position: 'absolute', top: 16, right: 28, zIndex: 2,
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 72, color: 'rgba(255,255,255,0.06)',
          letterSpacing: '-0.06em', lineHeight: 1,
          userSelect: 'none',
        }}>
          01
        </div>

        {/* Content pinned to bottom */}
        <div style={{ position: 'relative', zIndex: 2, padding: '32px' }}>
          <div style={{
            display: 'flex', gap: 0, marginBottom: 24,
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, overflow: 'hidden',
          }}>
            {[
              { val: '10.8M', label: 'Pieces / yr' },
              { val: '7',     label: 'Locations' },
              { val: '12+',   label: 'Brands' },
            ].map((s, i) => (
              <div key={s.label} style={{
                flex: 1, padding: '14px 16px',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 20, letterSpacing: '-0.03em',
                  color: '#ffffff', lineHeight: 1, marginBottom: 4,
                }}>{s.val}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>{s.label}</div>
              </div>
            ))}
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(24px, 2.5vw, 36px)',
            letterSpacing: '-0.03em', color: '#ffffff',
            lineHeight: 1.08, marginBottom: 14,
          }}>
            Scale &amp; Reliability
          </h2>

          <p style={{
            fontSize: 14, lineHeight: 1.75,
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 400, marginBottom: 24,
          }}>
            10.8 million woven pieces annually across 7 integrated
            locations. Woven bottoms, tailored garments, washing and
            carton production — all under one group.
          </p>

          <Link href="/facilities" style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.08em', color: '#4284b2',
            textDecoration: 'none', textTransform: 'uppercase',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            View facilities
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* RIGHT TOP — Sustainability */}
      <Link href="/sustainability" style={{
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 340,
        textDecoration: 'none',
        borderBottom: '2px solid rgba(255,255,255,0.06)',
      }}
      onMouseEnter={e => {
        const img = e.currentTarget.querySelector('.card-img') as HTMLElement
        if (img) img.style.transform = 'scale(1.05)'
      }}
      onMouseLeave={e => {
        const img = e.currentTarget.querySelector('.card-img') as HTMLElement
        if (img) img.style.transform = 'scale(1.0)'
      }}
      >
        <div className="card-img" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/pillar-sustainability.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.65) contrast(1.05) saturate(1.0)',
          transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.45) 55%, rgba(10,22,40,0.1) 100%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'absolute', top: 28, left: 32, zIndex: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, background: 'rgba(22,163,74,0.12)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', color: '#4ade80', textTransform: 'uppercase' }}>Compliance</span>
        </div>

        <div style={{ position: 'absolute', top: 16, right: 28, zIndex: 2, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 72, color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.06em', lineHeight: 1, userSelect: 'none' }}>02</div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px', zIndex: 2 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
            {['GOTS', 'SMETA', 'Higg Index', 'OEKO-TEX®', 'Net Zero 2050'].map(c => (
              <span key={c} style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.08em', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', padding: '3px 7px', borderRadius: 3 }}>{c}</span>
            ))}
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em', color: '#ffffff', marginBottom: 10, lineHeight: 1.1 }}>Certified Sustainability</h3>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', fontWeight: 400, marginBottom: 18 }}>
            GOTS, SMETA, Higg Index, OEKO-TEX and Regenagri certified. Net Zero by 2050. Full supply chain traceability.
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: '#4284b2', display: 'flex', alignItems: 'center', gap: 8, textTransform: 'uppercase' }}>
            Our commitments
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </Link>

      {/* RIGHT BOTTOM — Digital Innovation */}
      <Link href="/innovation" style={{
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 340,
        textDecoration: 'none',
      }}
      onMouseEnter={e => {
        const img = e.currentTarget.querySelector('.card-img') as HTMLElement
        if (img) img.style.transform = 'scale(1.05)'
      }}
      onMouseLeave={e => {
        const img = e.currentTarget.querySelector('.card-img') as HTMLElement
        if (img) img.style.transform = 'scale(1.0)'
      }}
      >
        <div className="card-img" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/pillar-innovation.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.65) contrast(1.05) saturate(1.0)',
          transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.45) 55%, rgba(10,22,40,0.1) 100%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'absolute', top: 28, left: 32, zIndex: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, background: 'rgba(124,58,237,0.12)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <path d="M8 21h8M12 17v4"/>
              <path d="m7 10 3 3 4-5"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', color: '#a78bfa', textTransform: 'uppercase' }}>Technology</span>
        </div>

        <div style={{ position: 'absolute', top: 16, right: 28, zIndex: 2, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 72, color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.06em', lineHeight: 1, userSelect: 'none' }}>03</div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px', zIndex: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
            {['AI quality monitoring', 'End-to-end digital traceability', 'Cloud ERP — in progress', 'Gen 4.0 washing technology'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#a78bfa', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>{f}</span>
              </div>
            ))}
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em', color: '#ffffff', marginBottom: 10, lineHeight: 1.1 }}>Digital Innovation</h3>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', fontWeight: 400, marginBottom: 18 }}>
            AI-assisted quality monitoring, end-to-end digital traceability, cloud ERP and Generation 4.0 washing technology.
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: '#4284b2', display: 'flex', alignItems: 'center', gap: 8, textTransform: 'uppercase' }}>
            Our technology
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </Link>
    </>
  )
}