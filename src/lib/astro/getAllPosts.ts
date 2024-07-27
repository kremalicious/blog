import type { CollectionEntry } from 'astro:content'
import { loadAndFormatCollection } from './loadAndFormatCollection'
import { sortPosts } from './sortPosts'

export async function getAllPosts(): Promise<
  CollectionEntry<'articles' | 'links' | 'photos'>[]
> {
  const articles = await loadAndFormatCollection('articles')
  const links = await loadAndFormatCollection('links')
  const photos = await loadAndFormatCollection('photos')

  const allPosts = sortPosts([...articles, ...links, ...photos])
  return allPosts
}
