'use client'

const BRAND_LOGOS = [
  { name: 'Gap',              src: '/logos/gap.png',              height: 28 },
  { name: 'Banana Republic',  src: '/logos/bananaRepublic.png',   height: 22 },
  { name: 'Tommy Hilfiger',   src: '/logos/tommyHilfiger.png',    height: 20 },
  { name: 'Calvin Klein',     src: '/logos/calvinKlein.png',      height: 18 },
  { name: 'Eddie Bauer',      src: '/logos/eddieBauer.png',       height: 24 },
  { name: 'Marks & Spencer',  src: '/logos/marksAndSpencers.png', height: 26 },
  { name: 'Gant',             src: '/logos/gant.png',             height: 22 },
  { name: 'Michael Kors',     src: '/logos/michaelKors.png',      height: 20 },
  { name: 'Reiss',            src: '/logos/reiss.png',            height: 22 },
  { name: 'Brooks Brothers',  src: '/logos/brooksBrothers.png',   height: 24 },
]

export default function BrandTicker() {
  return (
    <section style={{
      background: '#ffffff',
      borderTop: '1px solid #e2e2de',
      borderBottom: '1px solid #e2e2de',
      padding: '40px 0',
      overflow: 'hidden',
    }}>
      <div style={{
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.16em',
        color: '#aaaaaa',
        textTransform: 'uppercase',
      }}>
        Trusted by the world's leading fashion brands
      </div>

      <div className="brand-ticker-wrap">
        <div
          className="animate-brand-scroll"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 72,
            width: 'max-content',
          }}
        >
          {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 36,
              flexShrink: 0,
            }}>
              <img
                src={brand.src}
                alt={brand.name}
                style={{
                  height: brand.height ?? 28,
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'grayscale(100%) brightness(0) opacity(0.35)',
                  transition: 'filter 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.filter = 'grayscale(0%) brightness(1) opacity(1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.filter = 'grayscale(100%) brightness(0) opacity(0.35)'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}