import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Maliban Wovens',
}

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '140px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, letterSpacing: '-0.03em', color: '#0f2137', marginBottom: 32 }}>
        Privacy Policy
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.8, color: '#6b6b6b' }}>
        Privacy policy content coming soon. Please contact us at info@malibanwovens.com for any privacy-related enquiries.
      </p>
    </div>
  )
}