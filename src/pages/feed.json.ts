import { getImage } from 'astro:assets'
import type { AstroConfig } from 'astro'
import { metadata } from '@/config'
import { getAllPosts, getFeedContent } from '@/features/posts/lib'
import faviconSrc from '@/images/favicon.png'

const { siteTitle, siteDescription, author } = metadata

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
      url: `${context.site}${post.data.slug}`,
      title: post.data.title,
      date_published: post.data.date,
      ...(post.data.updated && { date_modified: post.data.updated }),
      content_html: await getFeedContent(post)
    }))
  )

  return new Response(
    JSON.stringify({
      version: 'https://jsonfeed.org/version/1.1',
      title: siteTitle,
      description: siteDescription,
      home_page_url: context.site,
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
