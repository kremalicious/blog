import type { CollectionEntry } from 'astro:content'

export type BlogEntry = CollectionEntry<'articles' | 'links' | 'photos'> & {
  slug: string
  lead: string
  leadRaw: string
}

export type ArticleEntry = BlogEntry & {
  collection: 'articles'
  tableOfContents: string
}

export type PhotoEntry = BlogEntry & {
  collection: 'photos'
}

export type LinkEntry = BlogEntry & {
  collection: 'links'
}
