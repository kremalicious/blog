import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts'

export async function get(context) {
  const posts = await getCollection('blog')
  return {
    body: JSON.stringify({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      site: context.site,
      items: posts.map((post) => ({
        ...post.data,
        link: `/blog/${post.slug}/`
      }))
    })
  }
}
