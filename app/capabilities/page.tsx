import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: pageMeta.capabilities.title,
  description: pageMeta.capabilities.description,
  alternates: { canonical: 'https://malibanwovens.com/capabilities' },
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const capacityStats = [
  { value: '10.8M', label: 'Pieces per year', sub: 'Total annual output' },
  { value: '7', label: 'Production locations', sub: 'Across Sri Lanka' },
  { value: '20M', label: 'Washing capacity', sub: 'Units annually' },
  { value: '55 / 45', label: 'US / EU market split', sub: 'By volume' },
  { value: '90', label: 'Day lead time', sub: 'Standard FOB' },
]

const wovenBottoms = {
  category: 'Woven Bottoms & Casuals',
  capacity: '6 Million Units Annually',
  capacityNote: 'Produced across integrated hubs in Dehiattakandiya, Ingiriya and Balangoda',
  description: `Our core production category. We manufacture woven trousers, bottoms, and casual separates at scale — running continuous production across three dedicated manufacturing hubs, each specialised by garment complexity and finish requirement.`,
  description2: `[Add 2–3 sentences here describing your fabric handling range — e.g. stretch wovens, cotton twills, technical fabrics — and any finishing or washing capabilities specific to this category. Mention your quality control process and typical buyer profile.]`,
  description3: `CMT and FOB available. Fabric sourcing support provided for buyers requiring GOTS, Better Cotton, or Global Recycled Standard certified materials.`,
  items: [
    'Cargo Pants', 'Formal Trousers', 'Semi-Formal', 'Skirts',
    'Shorts', 'Chinos', 'Casual Wear', 'Joggers',
  ],
  specs: [
    { label: 'MOQ', value: 'Discuss with team' },
    { label: 'Lead time', value: '75–90 days FOB' },
    { label: 'Service', value: 'CMT & FOB' },
    { label: 'Washing', value: 'In-house, 20M unit capacity' },
  ],
}

const tailored = {
  category: 'Tailored & Constructed Garments',
  capacity: '4.8 Million Units Annually',
  capacityNote: 'Produced at our dedicated jacket plant with automated pattern sewing systems',
  description: `Our jacket plant is purpose-built for structured and tailored garment production — equipped with automated pattern sewing systems, integrated pressing technology, and precision finishing lines capable of both men's and women's garments.`,
  description2: `[Add 2–3 sentences here about your canvassing, interlining, and construction capabilities. Mention any structured garment categories you specialise in — e.g. fused vs half-canvas, stretch suiting, technical outerwear. Note any brand names you've produced tailored garments for, if permitted.]`,
  description3: `Full end-to-end capability from fabric to packed garment. SMETA audited and Higg Index compliant — meeting the compliance requirements of top-tier European and US brands.`,
  items: [
    'Blazers', 'Suiting', "Men's Tailored", "Women's Tailored",
    'Sport Jackets', 'Formal Suits',
  ],
  specs: [
    { label: 'MOQ', value: 'Discuss with team' },
    { label: 'Lead time', value: '90–110 days FOB' },
    { label: 'Service', value: 'CMT & FOB' },
    { label: 'Plant capacity', value: '600K jackets / year' },
  ],
}

const tradeData = [
  {
    market: 'EU / UK',
    scheme: 'GSP',
    duty: 'Duty Free',
    generalDuty: '12%',
    origin: 'Fabric from SAARC region or EU',
  },
  {
    market: 'India',
    scheme: 'ISFTA',
    duty: 'Duty Free (up to 8M pcs ex-Sri Lanka)',
    generalDuty: '20% or Rs.135/pc',
    origin: 'Wholly or partially obtained with sufficient working',
  },
  {
    market: 'China',
    scheme: 'APTA',
    duty: 'Certain % waived (3.9% with APTA)',
    generalDuty: '6%',
    origin: 'Wholly or partially obtained with sufficient working',
  },
]

const buyers = [
  { name: 'PVH', pct: 34.8, note: 'Tommy Hilfiger · Calvin Klein' },
  { name: 'Eddie Bauer', pct: 23.1, note: 'US outdoor & lifestyle' },
  { name: 'Gap Inc', pct: 22.5, note: 'Gap · Banana Republic' },
  { name: 'M&S', pct: 7.9, note: 'Marks & Spencer' },
  { name: 'Gurteen', pct: 4.2, note: 'UK tailoring' },
  { name: 'Other', pct: 7.5, note: 'CCC · Gant · Michael Kors' },
]

const faqs = [
  {
    q: 'What is your annual production capacity?',
    a: 'Maliban Wovens produces over 10.8 million woven garments annually across our integrated Sri Lanka facilities — 6 million woven bottoms and casuals, and 4.8 million tailored and structured garments including jackets and blazers.',
  },
  {
    q: 'Do you offer duty-free access to EU and UK markets?',
    a: 'Yes. Sri Lanka operates under the EU GSP (Generalised Scheme of Preferences), providing duty-free access for woven garments to EU and UK markets. The standard 12% import duty is fully waived, provided fabric origin qualifies from the SAARC region or EU.',
  },
  {
    q: 'What certifications does Maliban Wovens hold?',
    a: 'We are GOTS certified, SMETA audited, Higg Index compliant, OEKO-TEX certified, Regenagri verified, Better Cotton Initiative member, and Global Recycled Standard compliant, among others.',
  },
  {
    q: 'Do you offer CMT and FOB?',
    a: 'Yes — both. Our vertically integrated group includes in-house washing (20M unit annual capacity), carton production, and a dedicated jacket plant, enabling full end-to-end FOB capability without third-party dependency.',
  },
  {
    q: 'Which brands do you currently supply?',
    a: 'Our active customer base includes PVH (Tommy Hilfiger, Calvin Klein), Gap Inc, Eddie Bauer, Marks & Spencer, Gant, Michael Kors, Charles Tyrwhitt, Reiss, Brooks Brothers and Fat Face, among others.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function CapabilitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ── */}
      <section
        aria-labelledby="cap-hero-heading"
        style={{
          background: 'linear-gradient(135deg, #071628 0%, #0D1F3C 55%, #0a2a1f 100%)',
          paddingTop: '9rem',
          paddingBottom: '6rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid texture */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(29,158,117,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(29,158,117,0.06) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        {/* Large number watermark */}
        <div aria-hidden style={{ position: 'absolute', right: '-1rem', top: '50%', transform: 'translateY(-50%)', fontSize: 'clamp(100px,16vw,200px)', fontWeight: 900, lineHeight: 1, color: 'rgba(29,158,117,0.05)', letterSpacing: '-0.05em', pointerEvents: 'none', userSelect: 'none', fontVariantNumeric: 'tabular-nums' }}>10.8M</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: '#1D9E75', flexShrink: 0 }} />
            <p style={{ color: '#1D9E75', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>What we make</p>
          </div>

          <h1
            id="cap-hero-heading"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.08, marginBottom: '0.6rem', maxWidth: '720px', letterSpacing: '-0.02em' }}
          >
            Woven Trouser & Suit Manufacturer — Sri Lanka
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.42)', marginBottom: '1.5rem' }}>
            Scale without compromise. Quality without exception.
          </p>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', maxWidth: '580px', lineHeight: 1.82, marginBottom: '3.5rem' }}>
            Specialising in woven bottoms and tailored garments. 10.8 million pieces annually across 7 integrated Sri Lanka locations. CMT and FOB. GSP duty-free to EU and UK markets.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="#products"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#1D9E75', color: '#fff', fontWeight: 700, fontSize: '0.9rem', padding: '0.85rem 1.75rem', borderRadius: '8px', textDecoration: 'none' }}
            >
              View product categories <ArrowRight size={15} />
            </a>
            <a
              href="#trade"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: 'rgba(255,255,255,0.75)', fontWeight: 600, fontSize: '0.9rem', padding: '0.85rem 1.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', textDecoration: 'none' }}
            >
              Trade benefits & duty rates
            </a>
          </div>
        </div>
      </section>

      {/* ── CAPACITY STRIP ── */}
      <section aria-label="Key production figures" style={{ background: '#0D1F3C', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
            {capacityStats.map((s) => (
              <div key={s.label} style={{ background: '#0D1F3C', padding: '1.75rem 1.5rem' }}>
                <dd style={{ fontSize: '1.7rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '0.3rem', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{s.value}</dd>
                <dt style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1D9E75', marginBottom: '0.15rem' }}>{s.label}</dt>
                <span style={{ fontSize: '0.68rem', color: '#4a5f78', letterSpacing: '0.04em' }}>{s.sub}</span>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── PRODUCT SECTIONS ── */}
      <div id="products">

        {/* Woven Bottoms */}
        <section
          aria-labelledby="woven-heading"
          style={{ padding: '6rem 0', background: '#fff', borderBottom: '1px solid #f1f5f9' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top label row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3.5rem' }}>
              <div>
                <p style={{ color: '#1D9E75', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Category 01</p>
                <h2
                  id="woven-heading"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#0D1F3C', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '600px' }}
                >
                  Woven Trouser & Bottom Manufacturer
                </h2>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0D1F3C', lineHeight: 1, letterSpacing: '-0.02em' }}>6M</div>
                <div style={{ fontSize: '0.72rem', color: '#1D9E75', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Units Annually</div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '0.2rem', maxWidth: '200px' }}>{wovenBottoms.capacityNote}</div>
              </div>
            </div>

            {/* Content grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
              {/* Copy */}
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '2rem' }}>
                  <p>{wovenBottoms.description}</p>
                  <p style={{ color: '#94a3b8', fontStyle: 'italic', borderLeft: '3px solid #e2e8f0', paddingLeft: '1rem' }}>{wovenBottoms.description2}</p>
                  <p>{wovenBottoms.description3}</p>
                </div>
                {/* Spec table */}
                <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  {wovenBottoms.specs.map((s, i) => (
                    <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.25rem', borderBottom: i < wovenBottoms.specs.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                      <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>{s.label}</span>
                      <span style={{ fontSize: '0.85rem', color: '#0D1F3C', fontWeight: 700 }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Garment types grid */}
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Garment types</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '2rem' }}>
                  {wovenBottoms.items.map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>
                      <Check size={13} style={{ color: '#1D9E75', flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>
                <a
                  href="mailto:info@malibanwovens.com?subject=Woven Bottoms Enquiry"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#0D1F3C', color: '#fff', fontWeight: 600, fontSize: '0.85rem', padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none' }}
                >
                  Request samples <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Tailored */}
        <section
          aria-labelledby="tailored-heading"
          style={{ padding: '6rem 0', background: '#f8fafc' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top label row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3.5rem' }}>
              <div>
                <p style={{ color: '#1D9E75', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Category 02</p>
                <h2
                  id="tailored-heading"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#0D1F3C', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '600px' }}
                >
                  Tailored Jacket & Suit Manufacturer Sri Lanka
                </h2>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0D1F3C', lineHeight: 1, letterSpacing: '-0.02em' }}>4.8M</div>
                <div style={{ fontSize: '0.72rem', color: '#1D9E75', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Units Annually</div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '0.2rem', maxWidth: '200px' }}>{tailored.capacityNote}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
              {/* Garment types left */}
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Garment types</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '2rem' }}>
                  {tailored.items.map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>
                      <Check size={13} style={{ color: '#1D9E75', flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>
                {/* Spec table */}
                <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  {tailored.specs.map((s, i) => (
                    <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.25rem', borderBottom: i < tailored.specs.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                      <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>{s.label}</span>
                      <span style={{ fontSize: '0.85rem', color: '#0D1F3C', fontWeight: 700 }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Copy right */}
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '2rem' }}>
                  <p>{tailored.description}</p>
                  <p style={{ color: '#94a3b8', fontStyle: 'italic', borderLeft: '3px solid #e2e8f0', paddingLeft: '1rem' }}>{tailored.description2}</p>
                  <p>{tailored.description3}</p>
                </div>
                <a
                  href="mailto:info@malibanwovens.com?subject=Tailored Garments Enquiry"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#0D1F3C', color: '#fff', fontWeight: 600, fontSize: '0.85rem', padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none' }}
                >
                  Request samples <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── TRADE BENEFITS ── */}
      <section
        id="trade"
        aria-labelledby="trade-heading"
        style={{ padding: '6rem 0', background: '#0D1F3C' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ marginBottom: '3rem' }}>
            <p style={{ color: '#1D9E75', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Sourcing from Sri Lanka</p>
            <h2
              id="trade-heading"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: '1rem' }}
            >
              Trade benefits, duty rates & preferential schemes
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.55)', maxWidth: '560px', lineHeight: 1.8 }}>
              Sri Lanka&apos;s preferential trade agreements give your brand a structural cost advantage — duty savings that compound at volume.
            </p>
          </div>

          {/* Trade table */}
          <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr 1fr 2fr', background: 'rgba(29,158,117,0.15)', padding: '0.9rem 1.5rem', gap: '1rem' }}>
              {['Market', 'Scheme', 'Duty benefit', 'General duty', 'Origin criteria'].map((h) => (
                <span key={h} style={{ fontSize: '0.68rem', fontWeight: 700, color: '#1D9E75', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            {tradeData.map((row, i) => (
              <div
                key={row.market}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr 1fr 2fr', padding: '1.1rem 1.5rem', gap: '1rem', alignItems: 'center', background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent', borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{row.market}</span>
                <span style={{ fontSize: '0.82rem', background: 'rgba(29,158,117,0.15)', color: '#1D9E75', padding: '0.25rem 0.6rem', borderRadius: '6px', fontWeight: 600, display: 'inline-block', width: 'fit-content' }}>{row.scheme}</span>
                <span style={{ fontSize: '0.88rem', color: '#4de8b8', fontWeight: 700 }}>{row.duty}</span>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>{row.generalDuty}</span>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{row.origin}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginTop: '1rem' }}>
            * Duty rates and scheme eligibility subject to current trade agreements. Consult your customs broker for product-specific classification.
          </p>
        </div>
      </section>

      {/* ── BUYER DISTRIBUTION ── */}
      <section
        aria-labelledby="buyers-heading"
        style={{ padding: '6rem 0', background: '#fff' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#1D9E75', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Buyer confidence</p>
              <h2
                id="buyers-heading"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0D1F3C', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}
              >
                Trusted by the world&apos;s most demanding brands
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.82, marginBottom: '1.5rem' }}>
                Our buyer base spans the largest volume apparel groups in the US and Europe. PVH — the parent of Tommy Hilfiger and Calvin Klein — represents our single largest buyer relationship at 34.8% of volume. Gap Inc, Eddie Bauer, and Marks &amp; Spencer complete the top tier.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0D1F3C', letterSpacing: '-0.02em' }}>55%</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1D9E75' }}>US Market</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.2rem' }}>Gap, PVH, Eddie Bauer, Brooks Brothers</div>
                </div>
                <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0D1F3C', letterSpacing: '-0.02em' }}>45%</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1D9E75' }}>EU / UK Market</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.2rem' }}>M&S, Gant, Charles Tyrwhitt, Reiss</div>
                </div>
              </div>
            </div>

            {/* Visual bar chart */}
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Volume by buyer</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {buyers.map((b) => (
                  <div key={b.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <div>
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0D1F3C' }}>{b.name}</span>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginLeft: '0.5rem' }}>{b.note}</span>
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1D9E75' }}>{b.pct}%</span>
                    </div>
                    <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${b.pct}%`, background: b.pct > 25 ? '#1D9E75' : b.pct > 15 ? '#5DCAA5' : '#9FE1CB', borderRadius: '3px', transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        aria-labelledby="faq-heading"
        style={{ padding: '6rem 0', background: '#f8fafc' }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#1D9E75', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Common questions</p>
            <h2
              id="faq-heading"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#0D1F3C', lineHeight: 1.15, letterSpacing: '-0.02em' }}
            >
              Sourcing from Sri Lanka — what buyers ask
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((f) => (
              <div
                key={f.q}
                style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem 1.75rem' }}
              >
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0D1F3C', marginBottom: '0.6rem' }}>{f.q}</h3>
                <p style={{ fontSize: '0.87rem', color: '#64748b', lineHeight: 1.78, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        aria-labelledby="cap-cta-heading"
        style={{ padding: '6rem 0', background: 'linear-gradient(135deg, #071628 0%, #0D1F3C 60%, #0a2a1f 100%)', position: 'relative', overflow: 'hidden' }}
      >
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(29,158,117,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(29,158,117,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#1D9E75', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1rem' }}>Get in touch</p>
              <h2
                id="cap-cta-heading"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: '1rem' }}
              >
                Discuss your sourcing requirements
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.52)', lineHeight: 1.8 }}>
                Contact our merchandising team to discuss product categories, capacity, lead times, certifications, and pricing. We respond within one business day.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="mailto:info@malibanwovens.com"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1D9E75', color: '#fff', fontWeight: 700, fontSize: '0.9rem', padding: '1.1rem 1.5rem', borderRadius: '10px', textDecoration: 'none' }}
              >
                <span>Send an enquiry</span>
                <ArrowRight size={16} />
              </a>
              <Link
                href="/sustainability"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: 600, fontSize: '0.9rem', padding: '1.1rem 1.5rem', borderRadius: '10px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <span>View sustainability & certifications</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/facilities"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: 600, fontSize: '0.9rem', padding: '1.1rem 1.5rem', borderRadius: '10px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <span>Explore our facilities</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}