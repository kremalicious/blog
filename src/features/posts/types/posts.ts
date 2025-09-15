import type { CollectionEntry } from 'astro:content'

export type BlogCollection = 'articles' | 'links' | 'photos'

export type PhotoEntry = CollectionEntry<'photos'>
export type ArticleEntry = CollectionEntry<'articles'>
export type LinkEntry = CollectionEntry<'links'>

export type BlogEntry = CollectionEntry<BlogCollection>
