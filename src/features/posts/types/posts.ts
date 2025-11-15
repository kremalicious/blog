import type { CollectionEntry } from 'astro:content'
import type { ImageMetadataFormatted } from './exif'

export type BlogCollection = 'articles' | 'links' | 'photos'

export type ArticlePost = CollectionEntry<'articles'>

export type PhotoPost = CollectionEntry<'photos'> & {
  data: { imageMetadata: ImageMetadataFormatted | undefined }
}

export type LinkPost = CollectionEntry<'links'>

export type BlogPost = CollectionEntry<BlogCollection>
