// Treat the TTRPG landing page and all of its descendants as one section.
export function isTtrpgSlug(slug: string): boolean {
  const normalized = slug.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '')
  return normalized === 'ttrpgs' || normalized.startsWith('ttrpgs/')
}
