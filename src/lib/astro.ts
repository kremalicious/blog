import { getCollection, CollectionEntry } from 'astro:content'

export async function loadAndFormatCollection(name: string) {
  const posts = await getCollection(name)

  posts.forEach((post: CollectionEntry<'articles'>) => {
    // remove date from slug
    const slug = post.slug.substring(11)
    // use date from frontmatter, or grab from file path
    const date = post.data.date
      ? post.data.date.toString()
      : slug.substring(1, 11)

    post.slug = slug
    post.data.date = date
  })

  return posts.reverse()
}
