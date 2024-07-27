import type { CollectionEntry } from 'astro:content'
import { markdownToHtml } from '../markdown'

export async function getFeedContent(
  post: CollectionEntry<'articles' | 'photos' | 'links'> & {
    data?: { image?: { src: string } }
  }
): Promise<string> {
  const footer =
    '<hr />This post was published on <a href="https://kremalicious.com">kremalicious.com</a>'
  const content = await markdownToHtml(post.body)

  return post?.data?.image
    ? `<img src="${post.data.image?.src}" /><br />${content}${footer}`
    : `${content}${footer}`
}
