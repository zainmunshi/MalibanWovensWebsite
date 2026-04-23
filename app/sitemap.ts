import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://malibanwovens.com'
  const pages = [
    '',
    '/about',
    '/capabilities',
    '/sustainability',
    '/innovation',
    '/facilities',
    '/brands',
    '/leadership',
    '/careers',
  ]

  return pages.map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }))
}