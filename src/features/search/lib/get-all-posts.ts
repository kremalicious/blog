import type { ImageMetadata } from 'astro'
import { getAllPosts } from '@/features/posts/lib'
import type { BlogEntry } from '@/features/posts/types'
import type { SearchResultItem } from '../types'

// helps to reduce DOM size
export async function getAllPostsForSearch(): Promise<SearchResultItem[]> {
  const allPosts = await getAllPosts()
  if (!allPosts) return []

  const cleaned = await Promise.all(
    allPosts.map(async (post) => {
      const imageSrc =
        post.collection === 'articles' || post.collection === 'photos'
          ? (post as BlogEntry & { data: { image: ImageMetadata } }).data.image
          : undefined

      return {
        slug: post.slug,
        collection: post.collection,
        data: {
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
