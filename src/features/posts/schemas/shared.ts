import { z } from 'astro:content'

export const schemaShared = {
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
  redirect_from: z.array(z.string()).optional(),
  author: z.string().optional(),
  featured: z.boolean().optional(),
  style: z.string().optional(),
  githubLink: z.string().optional()
}
