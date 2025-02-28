import type { BlogEntry } from '@config/content.schema'
import { loadAndFormatCollection } from './loadAndFormatCollection'
import { sortPosts } from './sortPosts'

export async function getAllPosts(): Promise<BlogEntry[]> {
  const articles = await loadAndFormatCollection('articles')
  const links = await loadAndFormatCollection('links')
  const photos = await loadAndFormatCollection('photos')

  const allPosts = sortPosts([...articles, ...links, ...photos])
  return allPosts
}
