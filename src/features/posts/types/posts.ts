import type { CollectionEntry } from 'astro:content'

export type BlogCollection = 'articles' | 'links' | 'photos'

export type PhotoPost = CollectionEntry<'photos'>
export type ArticlePost = CollectionEntry<'articles'>
export type LinkPost = CollectionEntry<'links'>

export type BlogPost = CollectionEntry<BlogCollection>
