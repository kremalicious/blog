import { getCollection, type CollectionEntry } from 'astro:content'
import { readOutExif } from '@lib/exif'
import path from 'path'
import config from '@config/blog.config'
import { sortPosts } from './sortPosts'

//
// Main loader for all collections content.
// ---
// Astro's `getCollection()` is never called
// from components, but this helper method instead.
//
export async function loadAndFormatCollection(
  name: 'articles' | 'links' | 'photos'
) {
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
    // remove date from slug
    //
    let slug = post.id.split('/')[0].substring(11) as CollectionEntry<
      'articles' | 'photos' | 'links'
    >['slug']

    // links are not folders so remove .md from the end
    if (post.collection === 'links') {
      slug = slug.substring(
        0,
        slug.length - 3
      ) as CollectionEntry<'links'>['slug']
    }

    const githubLink = `${config.repoContentPath}/${post.collection}/${post.id}`

    post.slug = slug
    post.data.date = date
    post.data.githubLink = githubLink

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
      const exif = await readOutExif(imagePath)
      post.data.exif = exif
    }
  }

  const posts = sortPosts(postsCollection)
  return posts
}
