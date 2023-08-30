import { getCollection, CollectionEntry } from 'astro:content'

export async function loadAndFormatCollection(
  name: 'articles' | 'links' | 'photos'
) {
  const posts = await getCollection(name)

  posts.forEach((post: CollectionEntry<'articles' | 'links' | 'photos'>) => {
    // remove date from slug
    const slug = post.slug.substring(11) as CollectionEntry<
      'articles' | 'links' | 'photos'
    >['slug']
    // use date from frontmatter, or grab from file path
    const date = post.data.date ? post.data.date : slug.substring(1, 11)

    post.slug = slug
    post.data.date = new Date(date)
  })

  return posts.reverse()
}
