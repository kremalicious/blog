import type { GetImageResult } from 'astro'
import type {
  BlogCollection,
  BlogPost,
  ImageMetadataFormatted
} from '@/features/posts/types'

type IncludedDataKeys = 'title' | 'tags' | 'slug' | 'date' | 'updated' | 'image'
type IncludedData = Omit<
  BlogPost['data'],
  Exclude<keyof BlogPost['data'], IncludedDataKeys>
>

export type SearchResultItem = {
  collection: BlogCollection
  data: IncludedData & {
    imageMetadata?: ImageMetadataFormatted
    leadRaw?: string
  }
  thumbImage?: GetImageResult
}

// {
//   title: BlogPost['data']['title']
//   tags: BlogPost['data']['tags']
//   imageMetadata: ImageMetadataFormatted
//   leadRaw: string
// }
