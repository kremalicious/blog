import type { BlogEntry } from '@config/content.schema'
import { getAllPosts } from './getAllPosts'

// Type for search results that have a simplified structure
export type SearchResultItem = {
  slug: string
  collection: string
  data: {
    title: string
    tags?: string[]
    lead?: string
    date?: Date
    updated?: Date
    image?: {
      src: string
      width: number
      height: number
      format: 'png' | 'jpg' | 'jpeg' | 'tiff' | 'webp' | 'gif' | 'svg' | 'avif'
    }
  }
}

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
