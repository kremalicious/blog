import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import type { RemarkPlugins } from 'astro'
import expressiveCode from 'astro-expressive-code'
import redirectFrom from 'astro-redirect-from'
import { defineConfig } from 'astro/config'
import { getSlug } from '../src/lib/astro/getSlug'
import { remarkLeadParagraph } from '../src/lib/remark-lead-paragraph/remark-lead-paragraph'
import { remarkToc } from '../src/lib/remark-toc/remark-toc'
import config from './blog.config'

// https://astro.build/config
export default defineConfig({
  site: config.siteUrl,
  output: 'static',
  cacheDir: '.astro',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkLeadParagraph, remarkToc] as unknown as RemarkPlugins,
    shikiConfig: {
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'nord',
      langs: [],
      wrap: true
    }
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
        uiFontSize: 'var(--font-size-mini)',
        codeFontFamily: 'var(--font-family-monospace)',
        codeFontSize: '0.8rem',
        frames: {
          frameBoxShadowCssValue: 'var(--box-shadow)'
        }
      }
    }),
    redirectFrom({ contentDir: './content', getSlug }),
    sitemap({
      filter: (page) =>
        !page.includes('page/') &&
        !page.includes('tags/') &&
        !page.includes('archive/') &&
        !page.includes('404')
    })
  ]
})
