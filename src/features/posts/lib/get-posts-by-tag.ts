import { slugifyAll } from '@/lib/slugify'
import type { BlogPost } from '../types'
import { getAllPosts } from './index'

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) =>
    slugifyAll(post.data.tags || []).includes(tag)
  )
}
