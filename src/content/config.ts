import { defineCollection, z } from 'astro:content'

const articles = defineCollection({
  type: 'content', // v2.5.0 and later
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    // Transform string to Date object
    date: z
      .string()
      .or(z.date())
      .optional()
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
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    download: z.string().optional(),
    toc: z.boolean().optional(),
    changelog: z.string().optional()
  })
})

const links = defineCollection({
  type: 'content', // v2.5.0 and later
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    linkurl: z.string(),
    date: z
      .string()
      .or(z.date())
      .optional()
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
    tags: z.array(z.string()).optional()
  })
})

const photos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z
      .string()
      .or(z.date())
      .optional()
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
    image: z.string(),
    tags: z.array(z.string()).optional()
  })
})

export const collections = { articles, links, photos }
