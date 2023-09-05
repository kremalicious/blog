import { getCollection, type CollectionEntry } from 'astro:content'
import { slugifyAll } from './slugify'
import { readOutExif } from './exif'
import path from 'path'

export function sortPosts(
  posts: CollectionEntry<'articles' | 'links' | 'photos'>[]
) {
  return posts
    .filter(({ data }) => !data.draft)
    .sort(
      (a, b) =>
        Math.floor(new Date(b.data.date as Date)?.getTime() / 1000) -
        Math.floor(new Date(a.data.date as Date)?.getTime() / 1000)
    )
}

export function getPostsByTag(
  posts: CollectionEntry<'articles' | 'links' | 'photos'>[],
  tag: string
) {
  return posts.filter((post) => slugifyAll(post.data.tags || []).includes(tag))
}

export async function loadAndFormatCollection(
  name: 'articles' | 'links' | 'photos'
) {
  const postsCollection = await getCollection(name)

  for await (const post of postsCollection) {
    // use date from frontmatter, or grab from file path
    const date = post.data.date
      ? post.data.date
      : new Date(post.id.split('/')[0].substring(0, 10))

    // remove date from slug
    const slug = post.id.split('/')[0].substring(11) as CollectionEntry<
      'articles' | 'links' | 'photos'
    >['slug']

    const githubLink = `https://github.com/kremalicious/blog/blob/main/content/${post.collection}/${post.id}`

    // extract exif & iptc data from photos
    if (post.collection === 'photos') {
      const isProd = import.meta.env.PROD

      //
      // Get the absolute image path from post.data.image
      // to read exif from
      //
      // production image.src:
      //    `/_astro/filename.hash.jpg`
      // development image.src:
      //    `/@fs/absolute/system/path/project/src/content/photos/postSlug/filename.jpg?origWidth=3873&origHeight=2796&origFormat=jpg`
      //
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

    post.slug = slug
    post.data.date = date
    post.data.githubLink = githubLink
  }

  const posts = sortPosts(postsCollection)
  return posts
}

export async function getAllPosts() {
  const articles = await loadAndFormatCollection('articles')
  const links = await loadAndFormatCollection('links')
  const photos = await loadAndFormatCollection('photos')
  const allPosts = [...articles, ...links, ...photos]
  const allPostsSorted = sortPosts(allPosts)

  return allPostsSorted
}

export async function getAllTags() {
  const allPosts = await getAllPosts()
  const allUniqueTags = slugifyAll([
    ...new Set(
      allPosts
        // only map posts which have tags defined
        .filter((post) => post.data.tags)
        .map((post) => post.data.tags)
        .flat()
    )
  ] as string[])

  return allUniqueTags
}
