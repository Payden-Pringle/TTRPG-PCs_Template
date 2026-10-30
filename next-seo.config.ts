import { DefaultSeoProps } from 'next-seo'
const config: DefaultSeoProps = {
  titleTemplate: '%s | Payden’s TTRPG Archive',
  defaultTitle: 'Payden’s TTRPG Archive',
  description: 'Stories, characters, and the worlds around them.',
  openGraph: { type: 'website', locale: 'en_US', title: 'Payden’s TTRPG Archive', description: 'Stories, characters, and the worlds around them.' },
  additionalLinkTags: [{ rel: 'icon', href: '/favicon/favicon.ico' }],
}
export default config
