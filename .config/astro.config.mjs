import { defineConfig } from 'astro/config'
import { remarkLeadParagraph } from './src/lib/remark-lead-paragraph.mjs'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://kremalicious.com',
  markdown: {
    shikiConfig: {
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'github-dark-dimmed',
      langs: [],
      wrap: true
    },
    remarkPlugins: [remarkLeadParagraph]
  },
  integrations: [react()]
})
