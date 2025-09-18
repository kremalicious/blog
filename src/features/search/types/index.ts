import type { BlogCollection, BlogPost } from '@/features/posts/types'

// Type for search results with a simplified structure
export type SearchResultItem = {
  collection: BlogCollection
  data: Omit<BlogPost['data'], 'tableOfContents' | 'leadRaw'>
}
