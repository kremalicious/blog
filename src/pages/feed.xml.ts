import rss from '@astrojs/rss'
import type { AstroConfig } from 'astro'
import config from '@/config/blog.config'
import { getAllPosts } from '@/features/posts/lib'
import { getFeedContent } from '@/features/posts/lib/feed'

const { siteTitle, siteDescription } = config

export async function GET(context: AstroConfig) {
  const allPostsSorted = await getAllPosts()

  const items = await Promise.all(
    allPostsSorted.map(async (post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `${context.site}${post.data.slug}`,
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
