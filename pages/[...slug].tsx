import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPostBySlug, getAllPosts, getLinksMapping, getPortraitUrl } from '../lib/api'
import { markdownToHtml } from '../lib/markdownToHtml'
import { isTtrpgSlug } from '../lib/sections'
import type PostType from '../interfaces/post'
import path from 'path'
import PostSingle from '../components/blog/post-single'
import Layout from '../components/misc/layout'
import { NextSeo } from 'next-seo'

type Items = {
  title: string,
  excerpt: string,
}

type Props = {
  post: PostType
  slug: string
  backlinks: { [k: string]: Items }
  notes: { slug: string, title: string, excerpt: string }[]
  portraitUrl: string | null
  characters: { slug: string, title: string }[]
}

export default function Post({ post, backlinks, notes, portraitUrl, characters }: Props) {
  const router = useRouter()
  const description = post.excerpt.slice(0, 155)
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <Layout>
          <NextSeo
            title={post.title}
            description={description}
            noindex={post.noindex === true}
            openGraph={{
              title: post.title,
              description,
              type: 'article',
              images: [{
                url: (post.ogImage?.url) ? post.ogImage.url : "https://paydenkp.vercel.app/favicon/android-chrome-512x512.png",
                width: (post.ogImage?.url) ? null: 512,
                height: (post.ogImage?.url) ? null: 512,
                type: null
              }]
            }}
          />
          <PostSingle
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            notes={notes}
            characters={characters}
            portraitUrl={portraitUrl}
            content={post.content}
            date={post.date}
            author={post.author}
            backlinks={backlinks}
          />
        </Layout>
      )}
    </>
  )
}

type Params = {
  params: {
    slug: string[]
    backlinks: string[]
  }
}

export async function getStaticProps({ params }: Params) {
  const slug = path.join(...params.slug)
  const normalizedSlug = slug.split(path.sep).join('/')
  const post = await getPostBySlug(slug, [
    'title',
    'excerpt',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'noindex',
    'portrait',
    'collapsibleSections',
  ])
  const content = await markdownToHtml(post.content || '', slug, String(post.collapsibleSections) === 'true')
  const linkMapping = await getLinksMapping()
  const backlinks = Object.keys(linkMapping).filter(k => linkMapping[k].includes(post.slug) && k !== post.slug && (isTtrpgSlug(normalizedSlug) || !isTtrpgSlug(k)))
  const backlinkNodes = Object.fromEntries(await Promise.all(backlinks.map(async (slug) => {
    const post = await getPostBySlug(slug, ['title', 'excerpt']);
    return [slug, post]
  })));

  const notes = normalizedSlug === 'home' || normalizedSlug === 'ttrpgs'
    ? getAllPosts(['slug', 'title', 'excerpt', 'excludeFromSearch']).filter(note => {
        if (note.excludeFromSearch) return false
        const noteSlug = note.slug.split(path.sep).join('/')
        return normalizedSlug === 'ttrpgs'
          ? noteSlug.startsWith('ttrpgs/') && !noteSlug.startsWith('ttrpgs/characters/')
          : noteSlug !== 'home' && noteSlug !== 'ttrpgs' && !noteSlug.startsWith('ttrpgs/')
      })
    : []
  const characters = normalizedSlug === 'ttrpgs/characters'
    ? getAllPosts(['slug', 'title'])
        .filter(note => note.slug.split(path.sep).join('/').startsWith('ttrpgs/characters/'))
        .sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }))
    : []

  return {
    props: {
      notes,
      characters,
      portraitUrl: normalizedSlug === 'home' ? getPortraitUrl(post.portrait) : null,
      post: {
        ...post,
        content,
      },
      backlinks: backlinkNodes,
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug'])
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug.split(path.sep),
        },
      } 
    }),
    fallback: false,
  }
}
