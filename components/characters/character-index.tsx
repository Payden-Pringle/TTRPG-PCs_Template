import Link from 'next/link'
import { useMemo, useState } from 'react'

type Character = { slug: string, title: string }
type Props = { characters: Character[] }

function searchable(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase()
}

export default function CharacterIndex({ characters }: Props) {
  const [query, setQuery] = useState('')
  const matches = useMemo(() => {
    const term = searchable(query.trim())
    return term ? characters.filter(character => searchable(character.title).includes(term)) : characters
  }, [characters, query])

  return (
    <section className="character-directory" aria-labelledby="character-directory-title">
      <h2 id="character-directory-title">The characters</h2>
      <label htmlFor="character-search">Search by name</label>
      <input id="character-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search characters…" autoComplete="off" aria-controls="character-list" />
      <p className="character-count" aria-live="polite">{matches.length} {matches.length === 1 ? 'character' : 'characters'}</p>
      {matches.length === 0 && <p className="character-empty">No characters match that name. Try another search.</p>}
      <ul id="character-list" className="character-list">
        {matches.map(character => (
          <li key={character.slug}>
            <Link href={'/' + character.slug.split(/[\\/]/).map(encodeURIComponent).join('/')}>
              <span>{character.title}</span><span className="character-arrow" aria-hidden="true">↗</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
