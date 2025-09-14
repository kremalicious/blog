import type { SearchResultItem } from '../types'

export async function getAllPostsForSearch(): Promise<SearchResultItem[]> {
  const posts = await fetch('/api/posts-search/')
  const json = (await posts.json()) as SearchResultItem[]

  return json
}
