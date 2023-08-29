import { defineCollection, z } from 'astro:content'

const articles = defineCollection({
  type: 'content', // v2.5.0 and later
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updated: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    image: z.string().optional()
  })
})

export const collections = { articles }
