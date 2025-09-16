import { slugifyAll } from '@/lib/slugify'
import { getAllPosts } from './index'

export type AllTags = {
  name: string
  count: number
}[]

export async function getAllTags(): Promise<AllTags> {
  const allPosts = await getAllPosts()
  const allTagsArray = allPosts.flatMap((post) => post.data.tags ?? [])
  const allTagsArraySlugified = slugifyAll(allTagsArray)

  // Explicitly define the type of tagCounts
  const tagCounts: Record<string, number> = {}

  for (const tag of allTagsArraySlugified) {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1
  }

  const allUniqueTags = Object.keys(tagCounts).map((tag) => ({
    name: tag,
    count: tagCounts[tag]
  }))

  return allUniqueTags
}
