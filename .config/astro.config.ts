import { defineConfig } from 'astro/config'
import remarkLeadParagraph from '../src/lib/remark-lead-paragraph'
import remarkToc from '../src/lib/remark-toc'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import redirects from './redirects.json'
import config from './blog.config'

// https://astro.build/config
export default defineConfig({
  site: config.siteUrl,
  output: 'static',
  markdown: {
    remarkPlugins: [remarkLeadParagraph, remarkToc as any],
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
