import { Searcher } from 'fast-fuzzy';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts  } from '../../../lib/api'
import { getMDExcerpt } from '../../../lib/markdownToHtml';
import { isTtrpgSlug } from '../../../lib/sections';

const allPosts = getAllPosts([
  "slug", "title", "content", "author", "date"
]);
const searchIndex = allPosts.map((p) => {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: getMDExcerpt(p.content),
    date: p.date,
    author: p.author,
  }
});
const searcher = new Searcher(searchIndex, {keySelector: (obj) => `${obj.title}\n${obj.excerpt}`})

export default function postHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).send(`Method ${req.method} Not Allowed`)
  }
  const query = typeof req.query.q === 'string' ? req.query.q.trim() : ''
  if (!query) return res.status(200).json([])
  const ttrpgSection = req.query.section === 'ttrpg'
  const searchedPosts = searcher.search(query, { returnMatchData: true })
    .filter(({ item }) => isTtrpgSlug(item.slug) === ttrpgSection)
  return res.status(200).json(searchedPosts.slice(0, 10))
}
