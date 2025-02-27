import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { schemaArticles, schemaLinks, schemaPhotos } from './content.schema'

const articles = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './content/articles' }),
  schema: ({ image }) => schemaArticles(image)
})

const photos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './content/photos' }),
  schema: ({ image }) => schemaPhotos(image)
})

const links = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './content/links' }),
  schema: schemaLinks
})

export const collections = { articles, links, photos }
