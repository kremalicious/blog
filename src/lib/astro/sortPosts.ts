import type { BlogEntry } from '@config/content.schema'
//
// Sort posts by date, newest first
//
export function sortPosts(posts: BlogEntry[]): BlogEntry[] {
  return posts.sort(
    (a, b) =>
      Math.floor(new Date(b.data.date as Date)?.getTime() / 1000) -
      Math.floor(new Date(a.data.date as Date)?.getTime() / 1000)
  )
}
