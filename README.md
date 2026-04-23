# Maliban Wovens — Website

Next.js 15 website built with the App Router, Tailwind CSS v4, and full SEO infrastructure.
All 9 pages compile as fully static HTML — fast, indexed, and ready for Vercel.

---

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

---

## Project Structure

```
app/
  layout.tsx              Root layout — Navbar, Footer, Organization schema
  page.tsx                Homepage — hero, stats, brands, pillars, CTA
  about/page.tsx          History, CARE values, timeline
  capabilities/page.tsx   Products, market split, FAQ schema
  sustainability/page.tsx CARE framework, Net Zero roadmap, certifications
  innovation/page.tsx     AI pillars, Gen 4 washing, digital layer
  facilities/page.tsx     7 locations, washing plant, jacket plant
  brands/page.tsx         Brand partners, buyer volume chart
  leadership/page.tsx     Org structure, team bios
  careers/page.tsx        Wellbeing benefits, grievance channel, openings

components/layout/
  Navbar.tsx              Responsive nav with mobile menu, scroll behaviour
  Footer.tsx              Full footer — links, products, certifications

lib/
  seo.ts                  All title tags + meta descriptions (all 9 pages)
  constants.ts            All site data — stats, brands, facilities, team
```

---

## Updating Content

Everything lives in **`lib/constants.ts`** — edit this file to update stats, brands, facilities, leadership bios, and certifications without touching page files.

To update SEO metadata (title tags, meta descriptions), edit **`lib/seo.ts`**.

---

## Adding Images

Drop images into `public/images/` and reference as `/images/filename.jpg`.

Priority images to add:
- `og-default.jpg` — 1200×630 Open Graph image (required)
- `logo.png` — for structured data
- `hero-factory.jpg` — homepage hero background
- `washing-plant.jpg` — facilities page
- `jacket-plant.jpg` — facilities page
- Headshots for each leadership team member

Use Next.js Image component for automatic optimisation:
```tsx
import Image from 'next/image'
<Image src="/images/hero-factory.jpg" alt="Maliban Wovens factory, Sri Lanka" width={1200} height={600} priority />
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Import at vercel.com — zero config needed
3. Add environment variable: `NEXT_PUBLIC_SITE_URL=https://malibanwovens.com`
4. Deploy

---

## Post-Launch SEO Checklist

- [ ] Add real contact email to capabilities and careers pages
- [ ] Upload og-default.jpg (1200×630px)
- [ ] Connect Google Search Console, submit sitemap at /sitemap.xml
- [ ] Set up Google Analytics 4
- [ ] Register on JAAF and EDB Sri Lanka supplier directories
- [ ] Test with PageSpeed Insights — target 90+ on all pages

---

## Keyword Targets by Page

| Page | Primary Keyword | Competition |
|---|---|---|
| Home | woven garment manufacturer Sri Lanka | Hard — 9–18 months |
| About | established apparel manufacturer Sri Lanka | Med |
| Capabilities | woven trouser manufacturer Sri Lanka | Easy — 3–4 months |
| Sustainability | GOTS certified garment manufacturer Sri Lanka | Easy — 3–4 months |
| Innovation | AI quality control garment manufacturing | Easy — own it now |
| Facilities | vertically integrated apparel manufacturer Sri Lanka | Med |
| Brands | Gap approved garment supplier Sri Lanka | Med |
| Careers | apparel industry jobs Sri Lanka | Med |

Full keyword map is in the separate Excel spreadsheet.

---

## Tech Stack

Next.js 15 · Tailwind CSS 4 · TypeScript · Lucide React · Vercel
