import Link from 'next/link'
import { useState } from 'react'
import Search from './search'

export default function Header() {
  const [searching, setSearching] = useState(false)
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label="Payden K. Pringle, home">
          <span className="brand-mark" aria-hidden="true">✦</span>
          <span><strong>PAYDEN K. PRINGLE</strong><small>PERSONAL WEBSITE</small></span>
        </Link>
        <nav className="header-nav" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/ttrpgs">TTRPGs</Link>
          <button className="search-trigger" type="button" onClick={() => setSearching(true)} aria-label="Search the archive">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.5 15.5 4.2 4.2"/></svg>
            <span>Search</span><kbd>⌘ K</kbd>
          </button>
        </nav>
      </div>
      <Search visible={searching} setVisible={setSearching} />
    </header>
  )
}
