import { slugifyAll } from '../slugify'
import { getAllPosts } from './index'

export type AllTags = {
  name: string
  count: number
}[]

export async function getAllTags(): Promise<AllTags> {
  const allPosts = await getAllPosts()
  const allTagsArray = allPosts
    .filter((post) => post.data.tags)
    .flatMap((post) => post.data.tags) as string[]
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
