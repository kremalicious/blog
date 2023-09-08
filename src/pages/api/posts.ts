import type { APIRoute } from 'astro'
import { getAllPostsForSearch } from '@lib/astro'

export async function GET(): Promise<APIRoute> {
  const allPosts = await getAllPostsForSearch()
  return new Response(JSON.stringify(allPosts))
}
