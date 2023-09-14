import { type CollectionEntry } from 'astro:content'
import { slugifyAll } from '../slugify'

export function getPostsByTag(
  posts: CollectionEntry<'articles' | 'links' | 'photos'>[],
  tag: string
) {
  return posts.filter((post) => slugifyAll(post.data.tags || []).includes(tag))
}
