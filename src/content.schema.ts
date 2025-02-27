import { type ImageFunction, z } from 'astro:content'

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
      lead: z.string().optional(),
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
      exif: z.object({}).optional()
    })
    .strict()

export const schemaLinks = z
  .object({
    ...schemaShared,
    linkurl: z.string()
  })
  .strict()

// export type ArticleFrontmatter = z.infer<typeof schemaArticles>
// export type LinkFrontmatter = z.infer<typeof schemaLinks>
// export type PhotoFrontmatter = z.infer<typeof schemaPhotos>
// export type PostFrontmatter =
//   | ArticleFrontmatter
//   | LinkFrontmatter
//   | PhotoFrontmatter
