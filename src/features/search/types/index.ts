// Type for search results with a simplified structure
export type SearchResultItem = {
  slug: string
  collection: string
  data: {
    title: string
    tags?: string[]
    lead?: string
    date?: Date
    updated?: Date
    image?: {
      src: string
      width: number
      height: number
      format: 'png' | 'jpg' | 'jpeg' | 'tiff' | 'webp' | 'gif' | 'svg' | 'avif'
    }
  }
}
