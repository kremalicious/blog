import type {
  ArticlePost,
  BlogPost,
  LinkPost,
  PhotoPost
} from '@/features/posts/types'
import { getCollectionEnhanced } from './get-collection-enhanced'
import { sortPosts } from './sort-posts'

export async function getAllPosts(): Promise<BlogPost[]> {
  const articles = (await getCollectionEnhanced('articles')) as ArticlePost[]
  const links = (await getCollectionEnhanced('links')) as LinkPost[]
  const photos = (await getCollectionEnhanced('photos')) as PhotoPost[]

  const allPosts = sortPosts([...articles, ...links, ...photos])
  return allPosts
}
