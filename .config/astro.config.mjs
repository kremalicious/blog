import { defineConfig } from 'astro/config'
import remarkLeadParagraph from './src/lib/remark-lead-paragraph.mjs'
import remarkToc from './src/lib/remark-toc.mjs'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import redirects from './redirects.json'

// https://astro.build/config
/** @type {import('astro/config').AstroUserConfig} */
export default defineConfig({
  site: 'https://kremalicious.com',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkLeadParagraph, remarkToc],
    shikiConfig: {
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'nord',
      langs: [],
      wrap: true
    }
  },
  redirects,
  vite: {
    resolve: {
      // for making content -> src/content symlink work
      // https://www.eliostruyf.com/symlink-content-astro-portability/#fix-the-content-issues
      preserveSymlinks: true
    }
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('page/') &&
        !page.includes('tags/') &&
        !page.includes('archive/') &&
        !page.includes('404')
    })
  ]
})
