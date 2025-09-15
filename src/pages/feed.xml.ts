import rss from '@astrojs/rss'
import type { AstroConfig } from 'astro'
import { metadata } from '@/config'
import { getAllPosts, getFeedContent } from '@/features/posts/lib'

const { siteTitle, siteDescription } = metadata

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
