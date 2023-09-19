import rss from '@astrojs/rss'
import config from '@config/blog.config'
import { getAllPosts } from '@lib/astro'
import { getFeedContent } from '@lib/feed'
import type { AstroConfig } from 'astro'

const { siteTitle, siteDescription } = config

export async function GET(context: AstroConfig) {
  const allPostsSorted = await getAllPosts()

  const items = await Promise.all(
    allPostsSorted.map(async (post) => ({
      title: post.data.title,
      pubDate: post.data.date as Date,
      link: `${context.site}${post.slug}`,
      content: await getFeedContent(post)
    }))
  )

  return rss({
    title: siteTitle,
    description: siteDescription,
    site: context.site as string,
    items
  })
}
