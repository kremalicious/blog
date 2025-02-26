import { getImage } from 'astro:assets'
import faviconSrc from '@/images/favicon.png'
import { getAllPosts } from '@/lib/astro'
import { getFeedContent } from '@/lib/feed'
import config from '@config/blog.config'
import type { AstroConfig } from 'astro'

const { siteTitle, siteDescription, author } = config

const favicon = await getImage({
  src: faviconSrc,
  width: 64,
  height: 64,
  format: 'png'
})

export async function GET(context: AstroConfig) {
  const allPostsSorted = await getAllPosts()

  const items = await Promise.all(
    allPostsSorted.map(async (post) => ({
      id: post.id,
      url: `${context.site}${post.slug}`,
      title: post.data.title,
      // biome-ignore lint/style/useNamingConvention: external spec
      date_published: post.data.date as Date,
      // biome-ignore lint/style/useNamingConvention: external spec
      ...(post.data.updated && { date_modified: post.data.updated as Date }),
      // biome-ignore lint/style/useNamingConvention: external spec
      content_html: await getFeedContent(post)
    }))
  )

  return new Response(
    JSON.stringify({
      version: 'https://jsonfeed.org/version/1.1',
      title: siteTitle,
      description: siteDescription,
      // biome-ignore lint/style/useNamingConvention: external spec
      home_page_url: context.site,
      // biome-ignore lint/style/useNamingConvention: external spec
      feed_url: `${context.site}feed.json`,
      favicon: `${context.site}${favicon}`,
      icon: `${context.site}${faviconSrc.src}`,
      language: 'en-US',
      authors: [
        {
          name: author.name,
          url: author.url
        }
      ],
      items
    }),
    {
      headers: { 'content-type': 'application/json' }
    }
  )
}
