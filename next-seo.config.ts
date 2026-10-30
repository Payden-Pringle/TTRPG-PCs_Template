import { DefaultSeoProps } from 'next-seo'
const config: DefaultSeoProps = {
  titleTemplate: '%s | Payden K. Pringle',
  defaultTitle: 'Payden K. Pringle',
  description: 'A personal website for Payden’s work, interests, and stories.',
  openGraph: { type: 'website', locale: 'en_US', title: 'Payden K. Pringle', description: 'A personal website for Payden’s work, interests, and stories.' },
  additionalLinkTags: [{ rel: 'icon', href: '/favicon/favicon.ico' }],
}
export default config
