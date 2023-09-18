import { defineCollection } from 'astro:content'
import { schemaArticles, schemaLinks, schemaPhotos } from './_schemas'

const articles = defineCollection({
  type: 'content',
  schema: ({ image }) => schemaArticles(image)
})

const links = defineCollection({
  type: 'content',
  schema: schemaLinks
})

const photos = defineCollection({
  type: 'content',
  schema: ({ image }) => schemaPhotos(image)
})

export const collections = { articles, links, photos }
