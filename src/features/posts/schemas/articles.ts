import { type ImageFunction, z } from 'astro:content'
import { schemaShared } from './shared'

export const schemaArticles = (image: ImageFunction) =>
  z
    .object({
      ...schemaShared,
      image: image().optional(),
      toc: z.boolean().optional(),
      download: z.string().optional(),
      changelog: z.string().optional()
    })
    .strict()
