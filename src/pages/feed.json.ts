import { getAllPosts } from '@lib/astro'
import config from '@config/blog.config.mjs'
import type { AstroConfig } from 'astro'
import { getPostFeedContent } from '@lib/feeds'

const { siteTitle, siteDescription, author } = config

export async function GET(context: AstroConfig) {
  const allPostsSorted = await getAllPosts()

  const items = await Promise.all(
    allPostsSorted.map(async (post) => ({
      id: post.id,
      url: `${context.site}${post.slug}/`,
      title: post.data.title,
      date_published: post.data.date as Date,
      ...(post.data.updated && { date_updated: post.data.updated as Date }),
      content_html: await getPostFeedContent(post)
    }))
  )

  return new Response(
    JSON.stringify({
      title: siteTitle,
      description: siteDescription,
      home_page_url: context.site,
      feed_url: `${context.site}feed.json`,
      favicon: `${context.site}favicon.ico`,
      icon: `${context.site}apple-touch-icon.png`,
      author: {
        name: author.name,
        url: author.uri
      },
      items
    })
  )
}
