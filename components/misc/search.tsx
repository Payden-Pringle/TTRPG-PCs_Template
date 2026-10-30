import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Result = { item: { slug: string, title: string, excerpt: string } }
export default function Search({ visible, setVisible }: { visible: boolean, setVisible: (value: boolean) => void }) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setVisible(true) }
      if (event.key === 'Escape') setVisible(false)
    }
    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [setVisible])
  useEffect(() => { if (visible) inputRef.current?.focus() }, [visible])
  useEffect(() => { setVisible(false) }, [router.asPath, setVisible])
  useEffect(() => {
    if (!visible || !query.trim()) { setResults([]); setFailed(false); return }
    const controller = new AbortController()
    const timer = setTimeout(() => {
      fetch('/api/search?q=' + encodeURIComponent(query), { signal: controller.signal })
        .then(response => { if (!response.ok) throw new Error('Search failed'); return response.json() })
        .then(data => { setResults(data); setFailed(false) })
        .catch(error => { if (error.name !== 'AbortError') { setResults([]); setFailed(true) } })
    }, 150)
    return () => { clearTimeout(timer); controller.abort() }
  }, [query, visible])
  if (!visible) return null
  return (
    <div className="search-overlay" onMouseDown={() => setVisible(false)}>
      <section className="search-dialog" role="dialog" aria-modal="true" aria-labelledby="search-title" onMouseDown={event => event.stopPropagation()}>
        <div className="search-heading"><div><div className="eyebrow">FIND SOMETHING</div><h2 id="search-title">Search the archive</h2></div><button className="search-close" type="button" aria-label="Close search" onClick={() => setVisible(false)}>×</button></div>
        <label htmlFor="archive-search" className="sr-only">Search notes</label>
        <input ref={inputRef} id="archive-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search notes and stories…" />
        <div className="search-results" aria-live="polite">
          {!query.trim() && <p>Start typing to explore the collection.</p>}
          {failed && <p>Search is unavailable right now. Please try again.</p>}
          {query.trim() && !failed && results.length === 0 && <p>No matching notes yet.</p>}
          {results.map(({ item }) => <Link key={item.slug} href={'/' + item.slug.split(/[\\/]/).map(encodeURIComponent).join('/')} className="search-result"><strong>{item.title}</strong><span>{item.excerpt}</span></Link>)}
        </div>
      </section>
    </div>
  )
}
