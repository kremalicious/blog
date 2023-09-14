import { type CollectionEntry } from 'astro:content'
import { slugifyAll } from '../slugify'

export type AllTags = {
  name: string
  count: number
}[]

export async function getAllTags(
  posts: CollectionEntry<'articles' | 'links' | 'photos'>[]
): Promise<AllTags> {
  const allTagsArray = posts
    .filter((post) => post.data.tags)
    .map((post) => post.data.tags)
    .flat() as string[]
  const allTagsArrayCleaned = slugifyAll(allTagsArray)

  // Explicitly define the type of tagCounts
  const tagCounts: Record<string, number> = {}

  for (const tag of allTagsArrayCleaned) {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1
  }

  const allUniqueTags = Object.keys(tagCounts).map((tag) => ({
    name: tag,
    count: tagCounts[tag]
  }))

  return allUniqueTags
}
