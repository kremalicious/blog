import { type CollectionEntry, type ImageFunction, z } from 'astro:content'

const schemaShared = {
  title: z.string(),
  date: z
    .string()
    .or(z.date())
    .optional()
    // Transform string to Date object
    .transform((val: string | Date | undefined) =>
      val ? new Date(val) : undefined
    ),
  updated: z
    .string()
    .or(z.date())
    .optional()
    .transform((val: string | Date | undefined) =>
      val ? new Date(val) : undefined
    ),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  // biome-ignore lint/style/useNamingConvention: external spec
  redirect_from: z.array(z.string()).optional(),
  author: z.string().optional(),
  featured: z.boolean().optional(),
  style: z.string().optional(),
  githubLink: z.string().optional()
}

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

export const schemaPhotos = (image: ImageFunction) =>
  z
    .object({
      ...schemaShared,
      image: image(),
      imageMetadata: z.object({}).optional()
    })
    .strict()

export const schemaLinks = z
  .object({
    ...schemaShared,
    linkurl: z.string()
  })
  .strict()

export type BlogEntry = CollectionEntry<'articles' | 'links' | 'photos'> & {
  slug: string
  lead: string
  leadRaw: string
}

export type ArticleEntry = BlogEntry & {
  collection: 'articles'
  tableOfContents: string
}

export type PhotoEntry = BlogEntry & {
  collection: 'photos'
}

export type LinkEntry = BlogEntry & {
  collection: 'links'
}
