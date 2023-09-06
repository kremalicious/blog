import rss from '@astrojs/rss'
import config from '@config/blog.config.ts'
import { getAllPosts } from '@lib/astro'
import { getPostFeedContent } from '@lib/feed'
import type { AstroConfig } from 'astro'

const { siteTitle, siteDescription } = config

export async function GET(context: AstroConfig) {
  const allPostsSorted = await getAllPosts()

  const items = await Promise.all(
    allPostsSorted.map(async (post) => ({
      title: post.data.title,
      pubDate: post.data.date as Date,
      link: `/${post.slug}/`,
      content: await getPostFeedContent(post)
    }))
  )

  return rss({
    title: siteTitle,
    description: siteDescription,
    site: context.site as string,
    items
  })
}
