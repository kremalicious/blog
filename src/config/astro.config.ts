import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig, fontProviders } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import redirectFrom from 'astro-redirect-from'
import remarkBreaks from 'remark-breaks'
import { loadEnv } from 'vite'
import { getSlug } from '../features/posts/lib/get-slug'
import { remarkLeadParagraph } from '../lib/remark-lead-paragraph/remark-lead-paragraph'
import { metadata } from './metadata'

const isProd = import.meta.env.PROD

const env = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), '')
const adobeId = env.ADOBE_ID

// https://astro.build/config
export default defineConfig({
  site: metadata.siteUrl,
  output: 'static',
  cacheDir: '.astro',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkLeadParagraph, remarkBreaks],
    shikiConfig: {
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'nord',
      langs: [],
      wrap: true
    }
  },
  image: {
    service: {
      entrypoint: 'src/features/posts/lib/image-service.ts'
    }
  },
  experimental: {
    fonts: [
      {
        name: 'Brandon Grotesque',
        cssVariable: '--font-brandon-grotesque',
        provider: fontProviders.adobe({ id: adobeId }),
        weights: [700],
        styles: ['normal'],
        featureSettings: 'liga'
      },
      {
        name: 'FF Tisa Sans Pro',
        cssVariable: '--font-ff-tisa-sans-pro',
        provider: fontProviders.adobe({ id: adobeId }),
        weights: [400, 600],
        styles: ['normal', 'italic'],
        featureSettings: 'liga'
      }
    ]
  },
  server: { host: true },
  integrations: [
    react(),
    expressiveCode({
      themes: ['nord'],
      // https://github.com/expressive-code/expressive-code/blob/ad08cf74095b30055e841d59497990fade634c86/packages/%40expressive-code/core/src/common/core-styles.ts
      styleOverrides: {
        borderRadius: 'var(--border-radius)',
        uiFontFamily: 'var(--font-family-monospace)',
        uiFontSize: 'var(--fs--1)',
        codeFontFamily: 'var(--font-family-monospace)',
        codeFontSize: 'var(--fs--1)',
        frames: {
          frameBoxShadowCssValue: 'var(--box-shadow)'
        }
      }
    }),
    ...(isProd ? [redirectFrom({ contentDir: './content', getSlug })] : []),
    ...(isProd
      ? [
          sitemap({
            filter: (page) =>
              !page.includes('page/') &&
              !page.includes('tags/') &&
              !page.includes('archive/') &&
              !page.includes('404')
          })
        ]
      : [])
  ]
})
