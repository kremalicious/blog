import { getCollection, type CollectionEntry } from 'astro:content'
import { slugifyAll } from './slugify'

export function getSortedPosts(
  posts: CollectionEntry<'articles' | 'links' | 'photos'>[]
) {
  return posts
    .filter(({ data }) => !data.draft)
    .sort(
      (a, b) =>
        Math.floor((b.data.date as Date).getTime() / 1000) -
        Math.floor((a.data.date as Date).getTime() / 1000)
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

  postsCollection.forEach(
    (post: CollectionEntry<'articles' | 'links' | 'photos'>) => {
      // remove date from slug
      const slug = post.slug.substring(11) as CollectionEntry<
        'articles' | 'links' | 'photos'
      >['slug']

      // use date from frontmatter, or grab from file path
      const date = post.data.date ? post.data.date : slug.substring(1, 11)
      const githubLink = `https://github.com/kremalicious/blog/blob/main/content/${post.collection}/${post.id}`

      post.slug = slug
      post.data.date = new Date(date)
      post.data.githubLink = githubLink
    }
  )

  const posts = getSortedPosts(postsCollection)
  return posts
}
