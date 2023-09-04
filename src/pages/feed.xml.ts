import rss from '@astrojs/rss'
import config from '@config/blog.config.mjs'
import { loadAndFormatCollection } from '@lib/astro'

const { siteTitle, siteDescription } = config

export async function get(context) {
  const articles = await loadAndFormatCollection('articles')
  const links = await loadAndFormatCollection('links')
  const photos = await loadAndFormatCollection('photos')
  const allPosts = [...articles, ...links, ...photos]

  return rss({
    title: siteTitle,
    description: siteDescription,
    site: context.site,
    items: allPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date as Date,
      link: `/blog/${post.slug}/`,
      content: post.body
    }))
  })
}
