import type { Metadata } from 'next'
import './globals.css'
import { defaultMetadata } from '@/lib/seo'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = defaultMetadata

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Maliban Wovens',
  legalName: 'Maliban Wovens Pvt Ltd',
  url: 'https://malibanwovens.com',
  logo: 'https://malibanwovens.com/images/logo.png',
  foundingDate: '1974',
  description: 'Leading woven garment manufacturer in Sri Lanka, producing 10.8 million pieces annually for brands including Gap, PVH, Tommy Hilfiger and Marks & Spencer.',
  address: { '@type': 'PostalAddress', addressLocality: 'Colombo', addressCountry: 'LK' },
  areaServed: ['US', 'GB', 'EU'],
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 10000 },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — must be in <head>, not CSS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}