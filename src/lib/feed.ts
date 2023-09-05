import type { CollectionEntry } from 'astro:content'
import { renderMarkdown } from '@astrojs/markdown-remark'

export async function getPostFeedContent(
  post: CollectionEntry<'articles' | 'photos' | 'links'>
) {
  const footer =
    '<hr />This post was published on <a href="https://kremalicious.com">kremalicious.com</a>'
  const content = await renderMarkdown(post.body, {
    gfm: true
  })

  return (post.data as any).image
    ? `<img src="${(post.data as any).image.src}" /><br />${
        content.code
      }${footer}`
    : `${content.code}${footer}`
}
