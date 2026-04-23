import { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://malibanwovens.com'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Maliban Wovens | Woven Garment Manufacturer Sri Lanka',
    template: '%s | Maliban Wovens',
  },
  description:
    'Leading Sri Lanka woven garment manufacturer supplying Gap, PVH & M&S. GSP duty-free for EU buyers. 10.8M+ pieces annually. GOTS, SMETA & OEKO-TEX certified.',
  keywords: [
    'woven garment manufacturer Sri Lanka',
    'apparel manufacturer Sri Lanka',
    'woven trouser manufacturer',
    'suit manufacturer Sri Lanka',
    'GOTS certified garment manufacturer',
    'SMETA audited apparel supplier',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Maliban Wovens',
    title: 'Maliban Wovens | Woven Garment Manufacturer Sri Lanka',
    description:
      'Leading Sri Lanka woven garment manufacturer. 50 years of excellence. Supplying Gap, PVH, M&S and more.',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maliban Wovens | Woven Garment Manufacturer Sri Lanka',
    description:
      'Leading Sri Lanka woven garment manufacturer. 50 years of excellence. GOTS & SMETA certified.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
}

// Per-page metadata — import and export from each page's metadata export
export const pageMeta = {
  home: {
    title: 'Maliban Wovens | Woven Garment Manufacturer Sri Lanka',
    description:
      'Leading Sri Lanka woven garment manufacturer supplying Gap, PVH & M&S. GSP duty-free for EU. 10.8M+ pieces annually. GOTS, SMETA & OEKO-TEX certified.',
  },
  about: {
    title: 'About Us | Established 1974 — Maliban Wovens',
    description:
      'Maliban Wovens was founded in 1974 as Maliban Textiles. Discover our 50-year story, CARE values, and commitment to ethical apparel manufacturing in Sri Lanka.',
  },
  capabilities: {
    title: 'Capabilities | Woven Trouser & Suit Manufacturer Sri Lanka',
    description:
      'Woven trouser, suit & blazer manufacturer in Sri Lanka. 10.8M+ pieces annually. CMT & FOB. GSP duty-free to EU. Approved supplier to Gap, PVH & M&S.',
  },
  sustainability: {
    title: 'Sustainability | GOTS & SMETA Certified — Maliban Wovens',
    description:
      'GOTS certified, SMETA audited, Higg Index compliant woven garment manufacturer in Sri Lanka. Net Zero by 2050. Full supply chain transparency and traceability.',
  },
  innovation: {
    title: 'Innovation | AI Manufacturing & Digital Traceability',
    description:
      'AI-assisted quality control, digital traceability from fabric to packed garment, Gen 4 washing technology and cloud ERP — Maliban Wovens leads digital garment manufacturing.',
  },
  facilities: {
    title: 'Facilities | 7 Locations Across Sri Lanka — Maliban Wovens',
    description:
      'Vertically integrated garment manufacturer with 7 facilities across Sri Lanka. 20M unit annual washing capacity. Dedicated jacket plant. Dehiattakandiya, Ingiriya & more.',
  },
  brands: {
    title: 'Our Brands | Gap, PVH, M&S Approved Supplier — Maliban Wovens',
    description:
      'Maliban Wovens is an approved supplier to Gap, PVH, Tommy Hilfiger, Marks & Spencer, Eddie Bauer and more. 55% US · 45% EU/UK market split.',
  },
  
  careers: {
    title: 'Careers | Apparel Industry Jobs Sri Lanka — Maliban Wovens',
    description:
      'Explore apparel industry jobs at Maliban Wovens Sri Lanka. Competitive benefits including free medical insurance, welfare shop and confidential grievance channel.',
  },
}
