import type { APIRoute } from 'astro'
import sharp from 'sharp'
import ico from 'sharp-ico'
import path from 'node:path'

const faviconSrc = path.resolve('src/images/favicon.png')

export const GET: APIRoute = async () => {
  const buffer = await sharp(faviconSrc).resize(32).toFormat('png').toBuffer()
  const icoBuffer = ico.encode([buffer])

  return new Response(icoBuffer, {
    headers: { 'Content-Type': 'image/x-icon' }
  })
}
