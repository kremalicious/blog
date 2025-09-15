import type {
  ArticleEntry,
  BlogEntry,
  LinkEntry,
  PhotoEntry
} from '@/features/posts/types'
import { loadAndFormatCollection } from './loadAndFormatCollection'
import { sortPosts } from './sortPosts'

export async function getAllPosts(): Promise<BlogEntry[]> {
  const articles = (await loadAndFormatCollection('articles')) as ArticleEntry[]
  const links = (await loadAndFormatCollection('links')) as LinkEntry[]
  const photos = (await loadAndFormatCollection('photos')) as PhotoEntry[]

  const allPosts = sortPosts([...articles, ...links, ...photos])
  return allPosts
}
