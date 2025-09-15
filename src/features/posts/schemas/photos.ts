import { type ImageFunction, z } from 'astro:content'
import { schemaShared } from './shared'

export const schemaPhotos = (image: ImageFunction) =>
  z
    .object({
      ...schemaShared,
      image: image(),
      imageMetadata: z.object({}).optional()
    })
    .strict()
