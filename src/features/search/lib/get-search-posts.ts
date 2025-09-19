import { getImage } from 'astro:assets'
import { getAllPosts } from '@/features/posts/lib'
import type {
  ArticlePost,
  ImageMetadataFormatted,
  PhotoPost
} from '@/features/posts/types'
import type { SearchResultItem } from '../types'

export async function getAllPostsForSearch(): Promise<SearchResultItem[]> {
  const allPosts = await getAllPosts()
  if (!allPosts) return []

  const cleaned = await Promise.all(
    allPosts.map(async (post) => {
      const leadRaw =
        (
          post.rendered?.metadata?.frontmatter as
            | { leadRaw?: string }
            | undefined
        )?.leadRaw ?? ''
      const image = (post.data as PhotoPost['data'] | ArticlePost['data']).image
      const imageMetadata = (post.data as PhotoPost['data'])
        .imageMetadata as ImageMetadataFormatted

      const filtered = {
        collection: post.collection,
        data: {
          title: post.data.title,
          slug: post.data.slug,
          tags: post.data.tags,
          date: post.data.date,
          updated: post.data.updated,
          image,
          imageMetadata,
          leadRaw
        }
      }

      const imageSrc =
        post.collection === 'articles' || post.collection === 'photos'
          ? post.data.image
          : undefined

      const thumbImage = imageSrc
        ? await getImage({ src: imageSrc, width: 686, height: 200 })
        : undefined

      return { ...filtered, thumbImage }
    })
  )

  return cleaned
}
