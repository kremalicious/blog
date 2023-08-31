import { defineCollection, z } from 'astro:content'
import { schemaArticles, schemaLinks, schemaPhotos } from './_schemas'

const articles = defineCollection({
  type: 'content',
  schema: schemaArticles
})

const links = defineCollection({
  type: 'content',
  schema: schemaLinks
})

const photos = defineCollection({
  type: 'content',
  schema: schemaPhotos
})

export const collections = { articles, links, photos }
