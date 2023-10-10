import type { APIRoute } from 'astro'
import { getAllPostsForSearch } from '@lib/astro'

export const GET: APIRoute = async () => {
  const allPosts = await getAllPostsForSearch()
  return new Response(JSON.stringify(allPosts), {
    headers: { 'content-type': 'application/json' }
  })
}
