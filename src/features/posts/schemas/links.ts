import { z } from 'astro:content'
import { schemaShared } from './shared'

export const schemaLinks = () =>
  z
    .object({
      ...schemaShared,
      linkurl: z.string()
    })
    .strict()
