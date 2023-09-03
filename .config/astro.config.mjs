import { defineConfig } from 'astro/config'
import { remarkLeadParagraph } from './src/lib/remark-lead-paragraph.mjs'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://kremalicious.com',
  markdown: {
    remarkPlugins: [remarkLeadParagraph]
  },
  integrations: [react()]
})
