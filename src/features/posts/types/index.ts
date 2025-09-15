import type { CollectionEntry } from 'astro:content'

export type BlogCollection = 'articles' | 'links' | 'photos'

export type PhotoEntry = CollectionEntry<'photos'>
export type ArticleEntry = CollectionEntry<'articles'>
export type LinkEntry = CollectionEntry<'links'>

export type BlogEntry = CollectionEntry<BlogCollection>
export type ImageMetadataFormatted = PhotoEntry['data']['imageMetadata']

// export type BlogEntry = CollectionEntry<BlogCollection> & {
//   slug: string
//   lead: string
//   leadRaw: string
// }

// export type ArticleEntry = BlogEntry & {
//   collection: 'articles'
//   tableOfContents: string
// }

// export type PhotoEntry = BlogEntry & {
//   collection: 'photos'
// }

// export type LinkEntry = BlogEntry & {
//   collection: 'links'
// }
