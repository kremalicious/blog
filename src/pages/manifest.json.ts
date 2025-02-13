import { getImage } from 'astro:assets'
import favicon from '@/images/favicon.png'
import config from '@config/blog.config'
import type { APIRoute } from 'astro'

const faviconPngSizes = [192, 512]

export const GET: APIRoute = async () => {
  const icons = await Promise.all(
    faviconPngSizes.map(async (size) => {
      const image = await getImage({
        src: favicon,
        width: size,
        height: size,
        format: 'png'
      })
      return {
        src: image.src,
        type: `image/${image.options.format}`,
        sizes: `${image.options.width}x${image.options.height}`
      }
    })
  )

  const manifest = {
    name: config.siteTitle,
    description: config.siteDescription,
    // biome-ignore lint/style/useNamingConvention: external spec
    start_url: '/',
    display: 'standalone',
    id: `${config.siteTitle}-blog`,
    // biome-ignore lint/style/useNamingConvention: external spec
    theme_color: '#e7eef4',
    // biome-ignore lint/style/useNamingConvention: external spec
    background_color: '#e7eef4',
    icons
  }

  return new Response(JSON.stringify(manifest), {
    headers: { 'content-type': 'application/json' }
  })
}
