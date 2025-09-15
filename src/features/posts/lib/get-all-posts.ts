import type {
  ArticleEntry,
  BlogEntry,
  LinkEntry,
  PhotoEntry
} from '@/features/posts/types'
import { getCollectionEnhanced } from './get-collection-enhanced'
import { sortPosts } from './sort-posts'

export async function getAllPosts(): Promise<BlogEntry[]> {
  const articles = (await getCollectionEnhanced('articles')) as ArticleEntry[]
  const links = (await getCollectionEnhanced('links')) as LinkEntry[]
  const photos = (await getCollectionEnhanced('photos')) as PhotoEntry[]

  const allPosts = sortPosts([...articles, ...links, ...photos])
  return allPosts
}
