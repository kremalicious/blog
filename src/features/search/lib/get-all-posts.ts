import { getAllPosts } from '@/features/posts/lib'
import type { SearchResultItem } from '../types'

// helps to reduce DOM size
export async function getAllPostsForSearch(): Promise<SearchResultItem[]> {
  const allPosts = await getAllPosts()
  if (!allPosts) return []

  const cleaned = await Promise.all(
    allPosts.map(async (post) => {
      const imageSrc =
        post.collection === 'articles' || post.collection === 'photos'
          ? post.data.image
          : undefined

      return {
        collection: post.collection,
        data: {
          slug: post.data.slug,
          title: post.data.title,
          tags: post.data.tags,
          lead: post.body?.substring(0, 200),
          date: post.data.date,
          updated: post.data.updated,
          image: imageSrc
        }
      }
    })
  )

  return cleaned
}
