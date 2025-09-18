import { getCollection } from 'astro:content'
import path from 'node:path'
import { metadata } from '@/config'
import { readImageMetadata } from '@/features/posts/lib'
import type { BlogCollection, BlogPost } from '@/features/posts/types'
import { getSlug } from './get-slug'
import { sortPosts } from './sort-posts'

//
// Main loader for all collections content.
// ---
// Astro's `getCollection()` is never called
// from components, but this helper method instead.
//
export async function getCollectionEnhanced(
  name: BlogCollection
): Promise<BlogPost[]> {
  let postsCollection = await getCollection(name)

  // filter out drafts, but only in production
  if (import.meta.env.PROD) {
    postsCollection = postsCollection.filter(({ data }) => data.draft !== true)
  }

  for await (const post of postsCollection) {
    //
    // use date from frontmatter, or grab from folder path
    //
    const date = post.data.date
      ? post.data.date
      : new Date(post.id.split('/')[0].substring(0, 10))

    //
    // construct slug from folder or file name
    //
    const slug = getSlug(`${post.collection}/${post.id}`)
    post.data.slug = slug

    const githubLink = `${metadata.repoContentPath}/${post.collection}/${post.id}`
    post.data.githubLink = githubLink

    post.data.date = date

    //
    // extract exif & iptc data from photos
    //
    if (post.collection === 'photos') {
      const isProd = import.meta.env.PROD

      // Get the absolute image path from post.data.image
      // to read exif from
      //
      // production image.src:
      //    `/_astro/filename.hash.jpg`
      // development image.src:
      //    `/@fs/absolute/system/path/project/src/content/photos/postSlug/filename.jpg?origWidth=3873&origHeight=2796&origFormat=jpg`
      const imagePath = isProd
        ? path.join(
            'content',
            'photos',
            post.id.split('/')[0],
            post.data.image.src.split('/')[2].split('.')[0].concat('.jpg')
          )
        : post.data.image.src.split('?')[0].split('/@fs')[1]
      const imageMetadata = await readImageMetadata(imagePath)
      post.data.imageMetadata = imageMetadata
    }
  }

  const sortedPosts = sortPosts(postsCollection)
  return sortedPosts
}
