import { getCollection, type CollectionEntry } from 'astro:content'
import { slugifyAll } from './slugify'
import { readOutExif } from './exif'

export function getSortedPosts(
  posts: CollectionEntry<'articles' | 'links' | 'photos'>[]
) {
  return posts
    .filter(({ data }) => !data.draft)
    .sort(
      (a, b) =>
        Math.floor((b.data.date as Date)?.getTime() / 1000) -
        Math.floor((a.data.date as Date)?.getTime() / 1000)
    )
}

export function getPostsByTag(
  posts: CollectionEntry<'articles' | 'links' | 'photos'>[],
  tag: string
) {
  return posts.filter((post) => slugifyAll(post.data.tags || []).includes(tag))
}

export default getPostsByTag

export async function loadAndFormatCollection(
  name: 'articles' | 'links' | 'photos'
) {
  const postsCollection = await getCollection(name)

  for await (const post of postsCollection) {
    // remove date from slug
    const slug = post.slug.substring(11) as CollectionEntry<
      'articles' | 'links' | 'photos'
    >['slug']

    // use date from frontmatter, or grab from file path
    const date = post.data.date ? post.data.date : slug.substring(1, 11)
    const githubLink = `https://github.com/kremalicious/blog/blob/main/content/${post.collection}/${post.id}`

    // extract exif & iptc data from photos
    if (post.collection === 'photos') {
      const imagePath = post.data.image.src.split('?')[0].split('/@fs')[1]
      const exif = await readOutExif(imagePath)
      post.data.exif = exif
    }

    post.slug = slug
    post.data.date = new Date(date)
    post.data.githubLink = githubLink
  }

  const posts = getSortedPosts(postsCollection)
  return posts
}
