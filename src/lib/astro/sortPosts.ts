import { type CollectionEntry } from 'astro:content'

export function sortPosts(
  posts: CollectionEntry<'articles' | 'links' | 'photos'>[]
): CollectionEntry<'articles' | 'links' | 'photos'>[] {
  return posts.sort(
    (a, b) =>
      Math.floor(new Date(b.data.date as Date)?.getTime() / 1000) -
      Math.floor(new Date(a.data.date as Date)?.getTime() / 1000)
  )
}
