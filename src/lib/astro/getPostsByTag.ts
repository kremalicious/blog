import { getAllPosts } from './index'
import { slugifyAll } from '../slugify'

export async function getPostsByTag(tag: string) {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) =>
    slugifyAll(post.data.tags || []).includes(tag)
  )
}
