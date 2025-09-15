import { slugifyAll } from '@/lib/slugify'
import type { BlogEntry } from '../types'
import { getAllPosts } from './index'

export async function getPostsByTag(tag: string): Promise<BlogEntry[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) =>
    slugifyAll(post.data.tags || []).includes(tag)
  )
}
