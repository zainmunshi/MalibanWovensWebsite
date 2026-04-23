import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMeta } from '@/lib/seo'
import { STATS, CERTIFICATIONS } from '@/lib/constants'
import ScrollReveal from '@/components/ui/ScrollReveal'
import StatCounter from '@/components/ui/StatCounter'
import HeroVideo from '@/components/ui/HeroVideo'
import BrandTicker from '@/components/ui/BrandTicker'
import PillarCards from '@/components/ui/PillarCards'
import ProductHover from '@/components/ui/ProductHover'
import CertTicker from '@/components/ui/CertTicker'
import ContactForm from '@/components/ui/ContactForm'

export const metadata: Metadata = {
  title: pageMeta.home.title,
  description: pageMeta.home.description,
  alternates: { canonical: 'https://malibanwovens.com' },
  openGraph: {
    title: pageMeta.home.title,
    description: pageMeta.home.description,
    url: 'https://malibanwovens.com',
    siteName: 'Maliban Wovens',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMeta.home.title,
    description: pageMeta.home.description,
    images: ['/images/og-default.jpg'],
  },
}

const pillars = [
  {
    num: '01',
    title: 'Scale & Reliability',
    body: '10.8 million woven pieces annually across 7 integrated locations. Woven bottoms, tailored garments, washing and carton production — all under one group.',
    href: '/facilities',
    tag: 'Manufacturing',
  },
  {
    num: '02',
    title: 'Certified Sustainability',
    body: 'GOTS, SMETA, Higg Index, OEKO-TEX and Regenagri certified. Net Zero by 2050. Full supply chain traceability from raw fibre to finished garment.',
    href: '/sustainability',
    tag: 'Compliance',
  },
  {
    num: '03',
    title: 'Digital Innovation',
    body: 'AI-assisted quality monitoring, end-to-end digital traceability, cloud ERP and Generation 4.0 washing technology. Technology embedded into the infrastructure.',
    href: '/innovation',
    tag: 'Technology',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO
          H1 server-rendered so Google indexes it.
          Video stays client-only in HeroVideo.
      ═══════════════════════════════════════════ */}
      <div style={{ position: 'relative' }}>
        <HeroVideo />

        {/* Server-rendered H1 overlaid on video */}
<div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 32px 420px',
          pointerEvents: 'none',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 200,
            fontSize: 'clamp(28px, 4vw, 56px)',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            margin: 0,
            textShadow: '0 2px 24px rgba(0,0,0,0.5)',
            opacity: 0,
            animation: 'fade-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both',
          }}>
            Woven Garment Excellence.<br />Since 1974.
          </h1>
        </div>

        
      </div>

      
      {/* ═══════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════ */}
      <section style={{
        background: '#0f2137',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }} className="stats-grid">
            {STATS.map((s, i) => (
              <div key={s.label} className="stat-wrap" style={{
                padding: '56px 48px',
                borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                position: 'relative',
              }}>
                {/* Hover accent line */}
                <div className="stat-line" style={{
                  position: 'absolute', top: 0, left: 48, right: 48,
                  height: 1, background: '#4284b2',
                }} />

                {/* Number */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 'clamp(36px, 3.5vw, 56px)',
                  letterSpacing: '-0.04em',
                  color: '#ffffff',
                  lineHeight: 1,
                  marginBottom: 20,
                }}>
                  {s.value}
                </div>

                {/* Label */}
                <div style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#4284b2',
                  marginBottom: 6,
                  letterSpacing: '0.01em',
                }}>
                  {s.label}
                </div>

                {/* Sub */}
                <div style={{
                  fontSize: 11,
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.22)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SEO INTRO — crawlable prose with
          primary + secondary keywords
      ═══════════════════════════════════════════ */}
      <section style={{ background: '#0f2137', padding: '0 24px 72px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{
            fontSize: 15,
            lineHeight: 1.85,
            color: 'rgba(255,255,255,0.35)',
            maxWidth: 680,
            fontFamily: 'var(--font-body)',
            borderLeft: '2px solid #4284b2',
            paddingLeft: 24,
            margin: 0,
          }}>
            Maliban Wovens is a leading woven garment manufacturer in Sri Lanka,
            producing over 10.8 million pieces annually across seven integrated
            facilities. Established in 1974 as part of the EAM Maliban Group,
            we supply woven trousers, blazers, and tailored garments to brands
            including Gap, PVH, Tommy Hilfiger and Marks &amp; Spencer —
            with duty-free access to EU and UK markets under Sri Lanka's GSP
            preferential trade scheme.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BRAND TICKER
      ═══════════════════════════════════════════ */}
      <BrandTicker />

      {/* ═══════════════════════════════════════════
          PILLARS — asymmetric editorial layout
      ═══════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════
          PILLARS
      ═══════════════════════════════════════════ */}
      <section style={{ background: '#0f2137', padding: '100px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 64 }}>
              <div style={{ width: 32, height: 1, background: '#4284b2' }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: '0.18em', color: '#4284b2',
                textTransform: 'uppercase',
              }}>
                What sets us apart
              </span>
            </div>
          </ScrollReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: 2,
            background: 'rgba(255,255,255,0.06)',
          }} className="pillars-grid">
            <PillarCards />
          </div>

        </div>
      </section>
      {/* ═══════════════════════════════════════════
          PRODUCTS — editorial light layout
      ═══════════════════════════════════════════ */}
     {/* ═══════════════════════════════════════════
          PRODUCTS — editorial light layout
      ═══════════════════════════════════════════ */}
      <section style={{ background: '#ffffff', padding: '100px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Header */}
          <ScrollReveal>
            <div style={{
              display: 'flex', alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: 72, flexWrap: 'wrap', gap: 24,
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  letterSpacing: '0.18em', color: '#4284b2',
                  textTransform: 'uppercase', marginBottom: 16,
                }}>
                  Product focus
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(28px, 3.5vw, 48px)',
                  letterSpacing: '-0.03em', color: '#0a0a0a',
                  lineHeight: 1.08, margin: 0,
                }}>
                  Woven bottoms &amp;<br />tailored garments
                </h2>
              </div>
              <Link href="/capabilities" style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.08em', color: '#4284b2',
                textDecoration: 'none', textTransform: 'uppercase',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                Full capabilities →
              </Link>
            </div>
          </ScrollReveal>

          {/* Product rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

            {/* Row 1 — Woven Bottoms — light, image left */}
            <ScrollReveal>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                background: '#f7f7f5',
                overflow: 'hidden',
              }} className="products-grid">

                {/* Image */}
                <ProductHover>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'url(/images/product-woven.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                  }} className="prod-img" />
                </ProductHover>

                {/* Content */}
                <div style={{
                  padding: '64px 56px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9,
                    letterSpacing: '0.14em', color: '#4284b2',
                    textTransform: 'uppercase', marginBottom: 20,
                  }}>
                    Category 01
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: 'clamp(22px, 2.5vw, 34px)',
                    letterSpacing: '-0.03em', color: '#0a0a0a',
                    lineHeight: 1.1, marginBottom: 20,
                  }}>
                    Woven Bottoms<br />&amp; Casuals
                  </h3>

                  <p style={{
                    fontSize: 14, lineHeight: 1.8,
                    color: '#6b6b6b', fontWeight: 400,
                    marginBottom: 32, maxWidth: 380,
                  }}>
                    Cargo pants, formal trousers, chinos, shorts, skirts and
                    casual wear — produced across our manufacturing hubs in
                    Dehiattakandiya, Ingiriya and Balangoda.
                  </p>

                  {/* Capacity */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'baseline',
                    gap: 8, marginBottom: 36,
                    paddingBottom: 32,
                    borderBottom: '1px solid #e2e2de',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: 36, letterSpacing: '-0.04em', color: '#0a0a0a',
                      lineHeight: 1,
                    }}>6M</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10,
                      color: '#4284b2', letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}>units / year</span>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['Cargo Pants', 'Formal Trousers', 'Chinos', 'Shorts', 'Skirts', 'Casual Wear'].map(item => (
                      <span key={item} style={{
                        fontFamily: 'var(--font-mono)', fontSize: 9,
                        letterSpacing: '0.06em', color: '#6b6b6b',
                        border: '1px solid #e2e2de',
                        padding: '5px 10px', borderRadius: 4,
                        textTransform: 'uppercase',
                      }}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Row 2 — Tailored — dark, image right */}
            <ScrollReveal>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                background: '#0f2137',
                overflow: 'hidden',
              }} className="products-grid">

                {/* Content */}
                <div style={{
                  padding: '64px 56px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9,
                    letterSpacing: '0.14em', color: '#4284b2',
                    textTransform: 'uppercase', marginBottom: 20,
                  }}>
                    Category 02
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: 'clamp(22px, 2.5vw, 34px)',
                    letterSpacing: '-0.03em', color: '#ffffff',
                    lineHeight: 1.1, marginBottom: 20,
                  }}>
                    Tailored &amp;<br />Constructed Garments
                  </h3>

                  <p style={{
                    fontSize: 14, lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.5)', fontWeight: 400,
                    marginBottom: 32, maxWidth: 380,
                  }}>
                    Blazers and suiting from our dedicated jacket plant,
                    equipped with automated pattern sewing systems,
                    precision pressing, and integrated finishing technology.
                  </p>

                  {/* Capacity */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'baseline',
                    gap: 8, marginBottom: 36,
                    paddingBottom: 32,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: 36, letterSpacing: '-0.04em', color: '#ffffff',
                      lineHeight: 1,
                    }}>4.8M</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10,
                      color: '#4284b2', letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}>units / year</span>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
                    {['Blazers', 'Suiting', 'Sport Jackets', 'Formal Suits'].map(item => (
                      <span key={item} style={{
                        fontFamily: 'var(--font-mono)', fontSize: 9,
                        letterSpacing: '0.06em', color: 'rgba(255,255,255,0.4)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        padding: '5px 10px', borderRadius: 4,
                        textTransform: 'uppercase',
                      }}>{item}</span>
                    ))}
                  </div>

                  <Link href="/capabilities" style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    letterSpacing: '0.08em', color: '#4284b2',
                    textDecoration: 'none', textTransform: 'uppercase',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    alignSelf: 'flex-start',
                  }}>
                    View full capabilities
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>

                {/* Image */}
                <ProductHover>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'url(/images/product-tailored.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                  }} className="prod-img" />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to right, rgba(10,22,40,0.4) 0%, transparent 50%)',
                    pointerEvents: 'none',
                  }} />
                </ProductHover>

              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════════
          CERTIFICATIONS
      ═══════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════
          CERTIFICATIONS — light trust ticker
      ═══════════════════════════════════════════ */}
      <section style={{
        background: '#ffffff',
        borderTop: '1px solid #e2e2de',
        padding: '80px 0',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', marginBottom: 56 }}>
          <ScrollReveal>
            <div style={{
              display: 'flex', alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 24,
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  letterSpacing: '0.18em', color: '#4284b2',
                  textTransform: 'uppercase', marginBottom: 16,
                }}>
                  Compliance &amp; certifications
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(24px, 3vw, 40px)',
                  letterSpacing: '-0.03em', color: '#0a0a0a',
                  lineHeight: 1.08, margin: 0,
                }}>
                  Globally recognised standards
                </h2>
              </div>
              <Link href="/sustainability" style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.08em', color: '#4284b2',
                textDecoration: 'none', textTransform: 'uppercase',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                Full sustainability story →
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Ticker row 1 — scrolls left */}
        <CertTicker direction="left" />

        <div style={{ height: 2, background: '#f7f7f5', margin: '0' }} />

        {/* Ticker row 2 — scrolls right */}
        <CertTicker direction="right" />
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════
          CTA — split layout with contact form
      ═══════════════════════════════════════════ */}
      <section style={{
        background: '#0f2137',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: 600,
        }} className="cta-grid">

          {/* LEFT — headline + trust points */}
          <div style={{
            padding: '80px 72px 80px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }} className="cta-left">
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.18em', color: '#4284b2',
              textTransform: 'uppercase', marginBottom: 24,
            }}>
              Work with us
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(28px, 3.5vw, 52px)',
              letterSpacing: '-0.03em', color: '#ffffff',
              lineHeight: 1.05, marginBottom: 24,
            }}>
              Ready to source woven<br />garments from<br />Sri Lanka?
            </h2>

            <p style={{
              fontSize: 15, lineHeight: 1.8,
              color: 'rgba(255,255,255,0.45)',
              fontWeight: 400, marginBottom: 48,
              maxWidth: 400,
            }}>
              Whether you need woven trousers, blazers, or full suiting —
              our merchandising team can discuss capacity, lead times,
              certifications, and GSP duty-free pricing.
            </p>

            {/* Trust points */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              {[
                { val: '10.8M', label: 'pieces produced annually' },
                { val: '55%',   label: 'US market · 45% EU/UK' },
                { val: '0%',    label: 'EU import duty via GSP scheme' },
                { val: '50+',   label: 'years of manufacturing heritage' },
              ].map(t => (
                <div key={t.val} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: 18, letterSpacing: '-0.03em',
                    color: '#4284b2', minWidth: 52,
                  }}>{t.val}</div>
                  <div style={{
                    width: 1, height: 16,
                    background: 'rgba(255,255,255,0.1)',
                  }} />
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    letterSpacing: '0.06em',
                    color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase',
                  }}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — contact form */}
          <ContactForm />

        </div>
      </section>

     <style>{`
        @media (max-width: 900px) {
          .stats-grid    { grid-template-columns: repeat(2,1fr) !important; }
          .pillars-grid  { grid-template-columns: 1fr !important; }
          .products-grid { grid-template-columns: 1fr !important; }
          .certs-grid    { grid-template-columns: repeat(2,1fr) !important; }
          .cta-grid      { grid-template-columns: 1fr !important; }
          .cta-left      { padding: 60px 24px 40px !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; }
        }
        @media (max-width: 540px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .certs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}