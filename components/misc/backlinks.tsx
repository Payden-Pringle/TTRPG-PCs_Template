import Link from 'next/link'

type Props = { backlinks: { [slug: string]: { title: string, excerpt: string } } }
export default function Backlinks({ backlinks }: Props) {
  return <div className="related-list">{Object.keys(backlinks).map((slug) => (
    <Link key={slug} href={'/' + slug.split(/[\\/]/).map(encodeURIComponent).join('/')} className="related-link">
      <span>{backlinks[slug].title}</span><span aria-hidden="true">↗</span>
    </Link>
  ))}</div>
}
