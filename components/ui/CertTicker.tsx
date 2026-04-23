'use client'

const CERTS = [
  {
    name: 'GOTS',
    desc: 'Global Organic Textile Standard',
    logo: '/logos/cert-gots.png',
  },
  {
    name: 'OEKO-TEX®',
    desc: 'Harmful substance testing',
    logo: '/logos/cert-oekotex.png',
  },
  {
    name: 'Higg Index',
    desc: 'Sustainable Apparel Coalition',
    logo: '/logos/cert-higg.png',
  },
  {
    name: 'Better Cotton',
    desc: 'Sustainable cotton sourcing',
    logo: '/logos/cert-bettercotton.jpg',
  },
  {
    name: 'SMETA',
    desc: 'Sedex Members Ethical Trade Audit',
    logo: '/logos/cert-smeta.jpeg',
  },
  {
    name: 'GRS',
    desc: 'Global Recycled Standard',
    logo: '/logos/cert-grs.webp',
  },
  {
    name: 'Regenagri®',
    desc: 'Regenerative agriculture',
    logo: '/logos/cert-regenagri.png',
  },
  {
    name: 'SLCP',
    desc: 'Social & Labor Convergence Program',
    logo: '/logos/cert-slcp.webp',
  },
]

export default function CertTicker({ direction }: { direction: 'left' | 'right' }) {
  const items = [...CERTS, ...CERTS]

  return (
    <div style={{
      overflow: 'hidden',
      padding: '28px 0',
      maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
    }}>
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: `${direction === 'left' ? 'cert-scroll-left' : 'cert-scroll-right'} 32s linear infinite`,
        gap: 0,
      }}>
        {items.map((cert, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '0 40px',
            borderRight: '1px solid #e2e2de',
            flexShrink: 0,
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f7f7f5'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            {/* Logo */}
            <div style={{
              width: 56, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <img
                src={cert.logo}
                alt={cert.name}
                style={{
                  maxWidth: 56, maxHeight: 36,
                  width: 'auto', height: 'auto',
                  objectFit: 'contain',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.opacity = '1'}
                onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.opacity = '0.7'}
              />
            </div>

            {/* Text */}
            <div>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 13, letterSpacing: '-0.01em', color: '#0a0a0a',
                marginBottom: 2, whiteSpace: 'nowrap',
              }}>
                {cert.name}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 9,
                letterSpacing: '0.06em', color: '#aaaaaa',
                textTransform: 'uppercase', whiteSpace: 'nowrap',
              }}>
                {cert.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes cert-scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes cert-scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        div:hover > div {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}