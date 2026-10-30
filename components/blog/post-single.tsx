import Link from 'next/link'
import Author from '../../interfaces/author'
import Backlinks from '../misc/backlinks'
import PostBody from './post-body'
import PostMeta from './post-meta'

type ArchiveNote = { slug: string, title: string, excerpt: string }
type Props = {
  title: string, content: string, excerpt: string, slug: string,
  date?: string, author?: Author, notes: ArchiveNote[], portraitUrl: string | null,
  backlinks: { [k: string]: { title: string, excerpt: string } }
}

export default function PostSingle({ title, date, author, content, excerpt, slug, notes, backlinks, portraitUrl }: Props) {
  const normalizedSlug = slug.replace(/\\/g, '/')
  const isHome = normalizedSlug === 'home'
  const isTtrpgLanding = normalizedSlug === 'ttrpgs'
  const isLanding = isHome || isTtrpgLanding
  const isTtrpgNote = normalizedSlug.startsWith('ttrpgs/')
  const hasBacklinks = Object.keys(backlinks).length > 0
  return (
    <div className={isLanding ? 'page page-home' : 'page page-note'}>
      <div className="page-shell">
        {isLanding ? (
          <>
            <section className="hero" aria-labelledby="page-title">
              <div className="hero-copy">
                <div className="eyebrow"><span className="eyebrow-line" /> {isHome ? 'A PERSONAL WEBSITE' : 'A PERSONAL COLLECTION'} <span className="eyebrow-star">✦</span> {isHome ? 'WORK & INTERESTS' : 'TABLETOP ROLEPLAYING'}</div>
                <h1 id="page-title">{title}</h1>
                {excerpt && <p className="hero-subtitle">{excerpt}</p>}
                <div className="hero-intro"><PostBody content={content} /></div>
                <a href="#explore" className="hero-cta">{isHome ? 'More about me' : 'Explore the collection'} <span aria-hidden="true">↘</span></a>
              </div>
              {isHome && portraitUrl ? (
                <div className="hero-art hero-portrait">
                  <div className="portrait-frame"><img src={portraitUrl} alt="Portrait of Payden Pringle" width="1144" height="1144" /></div>
                  <div className="art-caption" aria-hidden="true"><span>WORK &amp; INTERESTS</span><span>✦</span><span>PAYDEN K. PRINGLE</span></div>
                </div>
              ) : (
                <div className="hero-art" aria-hidden="true">
                  <div className="orbit orbit-one" /><div className="orbit orbit-two" />
                  <span className="art-spark spark-one">✦</span><span className="art-spark spark-two">✧</span>
                  {isTtrpgLanding ? <svg viewBox="0 0 240 260" fill="none"><path d="M120 16 218 72v112l-98 58-98-58V72L120 16Z"/><path d="M120 16 65 104l55 138 55-138-55-88ZM22 72l43 32 110 0 43-32M22 184l98 58 98-58M65 104 22 184m153-80 43 80M120 16l98 56M120 16 22 72"/><circle cx="120" cy="134" r="4"/></svg> : <div className="personal-monogram">P<span>✦</span></div>}
                  <div className="art-caption"><span>{isHome ? 'WORK & INTERESTS' : 'STORIES WORTH KEEPING'}</span><span>✦</span><span>{isHome ? 'PAYDEN K. PRINGLE' : 'EST. AT THE TABLE'}</span></div>
                </div>
              )}
            </section>
            <section className="archive-section" id="explore" aria-labelledby="archive-title">
              <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> {isHome ? 'MORE ABOUT ME' : 'THE ARCHIVE'}</div><h2 id="archive-title">{isHome ? 'A little more of my story' : 'Find your next story'}<span>.</span></h2></div><p>{isHome ? 'A closer look at the experiences behind the work.' : 'A collection of notes and stories, gathered in one place.'}</p></div>
              {notes.length > 0 ? <div className="archive-grid">{notes.map((note, index) => (
                <Link href={'/' + note.slug.split(/[\\/]/).map(encodeURIComponent).join('/')} className="archive-card" key={note.slug}>
                  <div className="card-top"><span>ENTRY {String(index + 1).padStart(2, '0')}</span><span className="card-arrow" aria-hidden="true">↗</span></div>
                  <div><h3>{note.title}</h3>{note.excerpt && <p>{note.excerpt}</p>}</div>
                  <div className="card-bottom">READ THE NOTE <span aria-hidden="true">→</span></div>
                </Link>
              ))}</div> : <p className="archive-empty">{isHome ? 'More to come.' : 'New notes will appear here as they’re published.'}</p>}
            </section>
          </>
        ) : (
          <article className="note-page">
            <div className="note-breadcrumb"><Link href={isTtrpgNote ? '/ttrpgs' : '/'}>{isTtrpgNote ? 'TTRPG archive' : 'Home'}</Link><span aria-hidden="true">/</span><span>Note</span></div>
            <header className="note-header"><div className="eyebrow"><span className="eyebrow-line" /> FROM THE ARCHIVE</div><h1 id="page-title">{title}</h1>{excerpt && <p>{excerpt}</p>}{(author || date) && <PostMeta author={author} date={date} />}</header>
            <div className={hasBacklinks ? 'note-layout with-sidebar' : 'note-layout'}>
              <div className="note-content"><PostBody content={content} /></div>
              {hasBacklinks && <aside className="related-notes"><div className="eyebrow">KEEP EXPLORING</div><h2>Connected notes</h2><p>Other pages that link here.</p><Backlinks backlinks={backlinks} /></aside>}
            </div>
          </article>
        )}
      </div>
    </div>
  )
}
