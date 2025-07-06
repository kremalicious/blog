import { getCollection } from 'astro:content'
import path from 'node:path'
import config from '@config/blog.config'
import type {
  ArticleEntry,
  BlogEntry,
  LinkEntry,
  PhotoEntry
} from '@config/content.schema'
import { readImageMetadata } from '@/lib/exif'
import { getSlug } from './getSlug'
import { sortPosts } from './sortPosts'

//
// Main loader for all collections content.
// ---
// Astro's `getCollection()` is never called
// from components, but this helper method instead.
//
export async function loadAndFormatCollection(
  name: 'articles'
): Promise<ArticleEntry[]>
export async function loadAndFormatCollection(
  name: 'links'
): Promise<LinkEntry[]>
export async function loadAndFormatCollection(
  name: 'photos'
): Promise<PhotoEntry[]>
export async function loadAndFormatCollection(
  name: 'articles' | 'links' | 'photos'
): Promise<ArticleEntry[] | LinkEntry[] | PhotoEntry[]> {
  let postsCollection = (await getCollection(name)) as BlogEntry[]

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
    post.slug = slug

    const githubLink = `${config.repoContentPath}/${post.collection}/${post.id}`
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

  const sortedPosts = sortPosts(postsCollection as unknown as BlogEntry[])

  if (name === 'articles') return sortedPosts as ArticleEntry[]
  if (name === 'photos') return sortedPosts as PhotoEntry[]
  return sortedPosts as LinkEntry[]
}
