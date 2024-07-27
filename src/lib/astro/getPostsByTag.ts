import type { CollectionEntry } from 'astro:content'
import { slugifyAll } from '../slugify'
import { getAllPosts } from './index'

export async function getPostsByTag(
  tag: string
): Promise<CollectionEntry<'articles' | 'links' | 'photos'>[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) =>
    slugifyAll(post.data.tags || []).includes(tag)
  )
}
