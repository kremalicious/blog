import type { BlogCollection, BlogEntry } from '@/features/posts/types'

// Type for search results with a simplified structure
export type SearchResultItem = {
  collection: BlogCollection
  data: Omit<BlogEntry['data'], 'tableOfContents' | 'leadRaw'>
}
