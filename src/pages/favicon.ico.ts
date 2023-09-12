import type { APIRoute } from 'astro'
import faviconSrc from '@images/favicon.png'
import sharp from 'sharp'
import ico from 'sharp-ico'

export const GET: APIRoute = async () => {
  const imgUrl = new URL(faviconSrc.src, import.meta.url).href
  // const imgBuffer = Buffer.from(faviconSrc)
  const buffer = await sharp(imgUrl).resize(32).toFormat('png').toBuffer()
  const icoBuffer = ico.encode([buffer])

  return new Response(icoBuffer, {
    headers: { 'Content-Type': 'image/x-icon' }
  })
}
