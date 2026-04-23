import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { pageMeta } from '@/lib/seo'

// ─── SEO METADATA ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: pageMeta.about.title,
  description: pageMeta.about.description,
  alternates: { canonical: 'https://malibanwovens.com/about' },
  openGraph: {
    title: pageMeta.about.title,
    description: pageMeta.about.description,
    url: 'https://malibanwovens.com/about',
    siteName: 'Maliban Wovens',
    type: 'profile',
    images: [
      {
        url: 'https://malibanwovens.com/images/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'Maliban Wovens — Woven Garment Manufacturer Sri Lanka since 1974',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMeta.about.title,
    description: pageMeta.about.description,
    images: ['https://malibanwovens.com/images/og-about.jpg'],
  },
}

// ─── STRUCTURED DATA ──────────────────────────────────────────────────────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://malibanwovens.com/#organization',
  name: 'Maliban Wovens',
  legalName: 'EAM Maliban Wovens (Pvt) Ltd',
  url: 'https://malibanwovens.com',
  logo: 'https://malibanwovens.com/images/logo.png',
  foundingDate: '1974',
  foundingLocation: { '@type': 'Place', name: 'Sri Lanka' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Colombo',
    addressCountry: 'LK',
  },
  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 500 },
  description:
    'Leading woven garment manufacturer in Sri Lanka since 1974. Producing over 10.8 million pieces annually across 7 integrated locations. Approved supplier to Gap, PVH, Tommy Hilfiger, and Marks & Spencer.',
  sameAs: ['https://www.linkedin.com/company/maliban-wovens'],
  memberOf: { '@type': 'Organization', name: 'EAM Maliban Group' },
  employee: [
    { '@type': 'Person', name: 'Tarik Kareem', jobTitle: 'Managing Director', worksFor: { '@id': 'https://malibanwovens.com/#organization' } },
    { '@type': 'Person', name: 'Salman Kareem', jobTitle: 'Director – Innovation & Development', worksFor: { '@id': 'https://malibanwovens.com/#organization' } },
    { '@type': 'Person', name: 'Sulaiman Kareem', jobTitle: 'Director – HR', worksFor: { '@id': 'https://malibanwovens.com/#organization' } },
    { '@type': 'Person', name: 'Mahadi Mohamed', jobTitle: 'Director – Finance', worksFor: { '@id': 'https://malibanwovens.com/#organization' } },
    { '@type': 'Person', name: 'Irfan Laffir', jobTitle: 'Director – Merchandising', worksFor: { '@id': 'https://malibanwovens.com/#organization' } },
    { '@type': 'Person', name: 'Kosala Abeyratna', jobTitle: 'Operational and Planning Director', worksFor: { '@id': 'https://malibanwovens.com/#organization' } },
    { '@type': 'Person', name: 'Sanjaya Dissanayake', jobTitle: 'Group HR and Compliance Manager', worksFor: { '@id': 'https://malibanwovens.com/#organization' } },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://malibanwovens.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://malibanwovens.com/about' },
  ],
}

// ─── PAGE DATA ────────────────────────────────────────────────────────────────
const timeline = [
  {
    year: '1974',
    label: 'The founding',
    event: 'Established as Maliban Textiles under the EAM Maliban Group — a single factory with a clear ambition.',
  },
  {
    year: '1993',
    label: 'Washing heritage',
    event: 'Dedicated washing infrastructure established in Wattala and Mahiyanganaya, building a capability that now outputs 20 million units annually.',
  },
  {
    year: '2000s',
    label: 'Scale across Sri Lanka',
    event: "Seven integrated locations opened across the island — from Colombo's head office to manufacturing hubs in Dehiattakandiya, Ingiriya, and Balangoda.",
  },
  {
    year: '2010s',
    label: 'Global certifications',
    event: 'GOTS, SMETA, Higg Index, OEKO-TEX, and Better Cotton certifications achieved — formalising ethical and environmental commitments.',
  },
  {
    year: '2020s',
    label: 'Digital transformation',
    event: 'AI-assisted monitoring, ERP upgrade, automated workflows, and end-to-end digital traceability embedded into production infrastructure.',
  },
  {
    year: '2024',
    label: 'Maliban Wovens',
    event: 'Rebranded to Maliban Wovens — a name that declares our specialisation, our technology ambition, and our next 50 years.',
  },
]

const care = [
  { letter: 'C', word: 'Conscious', desc: 'Aware of our environmental and social impact at every step of production — from fibre sourcing to packed garment.' },
  { letter: 'A', word: 'Accountability', desc: 'Taking ownership of our commitments to workers, buyers, and the planet — not just reporting on them.' },
  { letter: 'R', word: 'Respect', desc: 'Treating every employee, supplier, and community partner with dignity — regardless of role or rank.' },
  { letter: 'E', word: 'Empowerment', desc: 'Investing in our people through training, wellbeing, and transparent grievance channels so they can build careers and communities.' },
]

const stats = [
  { value: '50+', label: 'Years of operation' },
  { value: '7', label: 'Integrated locations' },
  { value: '11.4M', label: 'Garments annually' },
  { value: '12+', label: 'Global brand partners' },
]

const leadership = [
  { name: 'Tarik Kareem', role: 'Managing Director', initials: 'TK' },
  { name: 'Salman Kareem', role: 'Director — Innovation & Development', initials: 'SK' },
  { name: 'Sulaiman Kareem', role: 'Director — HR', initials: 'SK' },
  { name: 'Mahadi Mohamed', role: 'Director — Finance', initials: 'MM' },
  { name: 'Irfan Laffir', role: 'Director — Merchandising', initials: 'IL' },
  { name: 'Kosala Abeyratna', role: 'Operational & Planning Director', initials: 'KA' },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── HERO ── */}
      <section
        aria-labelledby="about-hero-heading"
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #071628 0%, #0D1F3C 55%, #0a2a1f 100%)',
          paddingTop: '9rem',
          paddingBottom: '7rem',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(29,158,117,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(29,158,117,0.06) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute', right: '-2rem', top: '50%', transform: 'translateY(-50%)',
            fontSize: 'clamp(120px, 18vw, 220px)', fontWeight: 900, lineHeight: 1,
            color: 'rgba(29,158,117,0.055)', letterSpacing: '-0.05em',
            pointerEvents: 'none', userSelect: 'none', fontFamily: 'Georgia, serif',
          }}
        >1974</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: '#1D9E75', flexShrink: 0 }} />
            <p style={{ color: '#1D9E75', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
              Est. 1974 · Sri Lanka · EAM Maliban Group
            </p>
          </div>

          {/* H1 — brand voice */}
          <h1
            id="about-hero-heading"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '0.6rem', maxWidth: '700px', letterSpacing: '-0.02em' }}
          >
            Five decades of woven garment manufacturing excellence
          </h1>

          {/* SEO subline — keyword-rich, immediately below H1, visually subtle */}
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.45)', marginBottom: '1.5rem', fontWeight: 400, letterSpacing: '0.01em' }}>
            Sri Lanka&apos;s trusted woven garment manufacturer since 1974
          </p>

          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.72)', maxWidth: '560px', lineHeight: 1.82, marginBottom: '3.5rem' }}>
            What began as Maliban Textiles has grown into a vertically integrated woven garment manufacturing group — seven locations, 11.4 million pieces annually, and partnerships with Gap, PVH, and Marks &amp; Spencer.
          </p>

          <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.08)', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            {stats.map((s) => (
              <div key={s.label} style={{ background: 'rgba(7,22,40,0.7)', padding: '1.4rem 1.5rem' }}>
                <dd style={{ fontSize: '1.9rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>{s.value}</dd>
                <dt style={{ fontSize: '0.68rem', color: '#6b7ea0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── STORY + TIMELINE ── */}
      <section
        aria-labelledby="story-heading"
        style={{ padding: '6rem 0', background: '#fff' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'start' }}>

            {/* Story copy */}
            <div>
              <p style={{ color: '#1D9E75', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                50 years of manufacturing excellence
              </p>
              <h2
                id="story-heading"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#0D1F3C', lineHeight: 1.12, marginBottom: '2rem', letterSpacing: '-0.02em' }}
              >
                From a single factory to a vertically integrated group
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.85 }}>
                <p>
                  Maliban Wovens was founded in 1974 as Maliban Textiles, part of the EAM Maliban Group. Over five decades we have grown from a single Sri Lankan apparel factory into a vertically integrated woven garment manufacturing group with seven locations, a dedicated washing plant established in 1993, and a specialist jacket facility — producing over 10.8 million woven garments annually.
                </p>
                <p>
                  Our manufacturing heritage spans woven bottoms, tailored garments, and structured outerwear, serving some of the most demanding brands in the US and European markets. Relationships with Gap, PVH, Tommy Hilfiger, Calvin Klein, and Marks &amp; Spencer have been built over many years of consistent quality, reliable delivery, and ethical manufacturing practice across our Sri Lanka factories.
                </p>
                <p>
                  In 2024, we rebranded to Maliban Wovens — a name that declares our core specialisation in woven garment manufacturing, our forward-looking investment in digital production systems, and our commitment to this category for the next 50 years.
                </p>
              </div>
              <div style={{ marginTop: '2.5rem', padding: '1.4rem 1.5rem', borderLeft: '3px solid #1D9E75', background: '#f0faf6', borderRadius: '0 10px 10px 0' }}>
                <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0D1F3C', marginBottom: '0.35rem' }}>Part of the EAM Maliban Group</p>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.72, margin: 0 }}>
                  Maliban Wovens holds a 30% ownership stake in Martex, extending our manufacturing reach and supply chain depth across Sri Lanka.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <p style={{ color: '#1D9E75', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Our journey</p>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0D1F3C', marginBottom: '2rem', letterSpacing: '-0.01em' }}>A timeline of milestones</h2>
              <ol>
                {timeline.map((t, i) => (
                  <li key={t.year} style={{ display: 'flex', gap: '1.25rem', paddingBottom: i < timeline.length - 1 ? '1.75rem' : 0, listStyle: 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '36px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: i === timeline.length - 1 ? '#1D9E75' : '#e8f7f2', border: `2px solid ${i === timeline.length - 1 ? '#1D9E75' : '#b6e5d4'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: '0.6rem', fontWeight: 800, color: i === timeline.length - 1 ? '#fff' : '#1D9E75', letterSpacing: '-0.02em' }}>{t.year.slice(-2)}</span>
                      </div>
                      {i < timeline.length - 1 && (
                        <div style={{ width: '2px', flex: 1, background: 'linear-gradient(to bottom, #b6e5d4, #e2e8f0)', marginTop: '4px', minHeight: '24px' }} />
                      )}
                    </div>
                    <div style={{ paddingTop: '0.5rem', paddingBottom: '0.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                        <time dateTime={t.year.replace(/s$/, '')} style={{ fontSize: '0.72rem', fontWeight: 800, color: '#1D9E75', letterSpacing: '0.04em' }}>{t.year}</time>
                        <span style={{ fontSize: '0.65rem', color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.label}</span>
                      </div>
                      <p style={{ fontSize: '0.87rem', color: '#475569', lineHeight: 1.72, margin: 0 }}>{t.event}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── CARE VALUES ── */}
      <section
        aria-labelledby="care-heading"
        style={{ padding: '6rem 0', background: '#f8fafc' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ maxWidth: '540px', marginBottom: '3.5rem' }}>
            <p style={{ color: '#1D9E75', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Our values</p>
            <h2
              id="care-heading"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0D1F3C', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: '1rem' }}
            >
              The CARE framework
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.82 }}>
              Every decision at Maliban Wovens is shaped by four principles — a framework we call CARE. It guides how we run our factories, treat our people, and meet our environmental obligations.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {care.map((v) => (
              <div key={v.letter} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem 1.75rem', position: 'relative', overflow: 'hidden' }}>
                <div aria-hidden style={{ position: 'absolute', right: '-0.5rem', top: '-1rem', fontSize: '6rem', fontWeight: 900, lineHeight: 1, color: 'rgba(29,158,117,0.07)', userSelect: 'none', pointerEvents: 'none', fontFamily: 'Georgia, serif' }}>
                  {v.letter}
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '12px', background: '#e8f7f2', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1D9E75', fontFamily: 'Georgia, serif', lineHeight: 1 }}>{v.letter}</span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0D1F3C', marginBottom: '0.6rem' }}>{v.word}</h3>
                  <p style={{ fontSize: '0.87rem', color: '#64748b', lineHeight: 1.75, margin: 0 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section
        aria-labelledby="leadership-heading"
        style={{ padding: '6rem 0', background: '#fff' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ maxWidth: '480px', marginBottom: '3rem' }}>
            <p style={{ color: '#1D9E75', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Leadership</p>
            <h2
              id="leadership-heading"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0D1F3C', lineHeight: 1.12, letterSpacing: '-0.02em' }}
            >
              The team behind the operation
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {leadership.map((person, i) => (
              <div
                key={person.name}
                itemScope
                itemType="https://schema.org/Person"
                style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid', borderColor: i === 0 ? 'transparent' : '#e2e8f0', background: i === 0 ? 'linear-gradient(135deg, #071628, #0D1F3C)' : '#f8fafc', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: i === 0 ? 'rgba(29,158,117,0.22)' : '#e8f7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700, color: i === 0 ? '#4de8b8' : '#1D9E75', letterSpacing: '0.04em' }}>
                  {person.initials}
                </div>
                <div>
                  <p itemProp="name" style={{ fontSize: '0.95rem', fontWeight: 700, color: i === 0 ? '#fff' : '#0D1F3C', marginBottom: '0.2rem' }}>{person.name}</p>
                  <p itemProp="jobTitle" style={{ fontSize: '0.75rem', color: i === 0 ? 'rgba(255,255,255,0.52)' : '#94a3b8', lineHeight: 1.5 }}>{person.role}</p>
                  <meta itemProp="worksFor" content="Maliban Wovens" />
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '1.25rem' }}>Headshots and individual bios available on request.</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        aria-labelledby="cta-heading"
        style={{ padding: '5rem 0', background: 'linear-gradient(135deg, #071628 0%, #0D1F3C 60%, #0a2a1f 100%)', position: 'relative', overflow: 'hidden' }}
      >
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(29,158,117,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(29,158,117,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <p style={{ color: '#1D9E75', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1rem' }}>Next step</p>
          <h2
            id="cta-heading"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: '1rem', maxWidth: '540px' }}
          >
            See what we make and how we make it
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.52)', marginBottom: '2.5rem', maxWidth: '440px', lineHeight: 1.78 }}>
            From woven bottoms to structured tailoring — explore our product categories, capacity, and the technology behind our Sri Lanka apparel manufacturing operation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/capabilities"
              className="hover:bg-[#22b886] hover:-translate-y-0.5 transition-all duration-200"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#1D9E75', color: '#fff', fontWeight: 700, fontSize: '0.9rem', padding: '0.85rem 1.75rem', borderRadius: '8px', textDecoration: 'none' }}
            >
              View capabilities <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="hover:border-white hover:text-white transition-all duration-200"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: 'rgba(255,255,255,0.75)', fontWeight: 600, fontSize: '0.9rem', padding: '0.85rem 1.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', textDecoration: 'none' }}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}