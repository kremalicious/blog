import type { BlogPost } from '@/features/posts/types'
//
// Sort posts by date, newest first
//
export function sortPosts(posts: BlogPost[]): BlogPost[] {
  return posts.sort(
    (a, b) =>
      Math.floor(new Date(b.data.date as Date)?.getTime() / 1000) -
      Math.floor(new Date(a.data.date as Date)?.getTime() / 1000)
  )
}
