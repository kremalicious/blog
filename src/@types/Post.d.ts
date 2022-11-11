export interface PageContext {
  tag?: string
  slug: string
  currentPageNumber: number
  numPages: number
  prevPagePath?: string
  nextPagePath?: string
}
