import { loadAndFormatCollection } from '@lib/astro'
import config from '@config/blog.config.mjs'

const { siteTitle, siteDescription } = config

export async function get(context) {
  const articles = await loadAndFormatCollection('articles')
  const links = await loadAndFormatCollection('links')
  const photos = await loadAndFormatCollection('photos')
  const allPosts = [...articles, ...links, ...photos]

  return {
    body: JSON.stringify({
      title: siteTitle,
      description: siteDescription,
      site: context.site,
      items: allPosts.map((post) => ({
        ...post.data,
        link: `/blog/${post.slug}/`
      }))
    })
  }
}
