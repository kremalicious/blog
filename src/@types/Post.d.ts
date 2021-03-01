import { ImageNode } from './Image'

export interface Fields {
  slug: string
  date: string
  type: 'article' | 'photo' | 'link'
  githubLink?: string
}

export interface Frontmatter {
  title: string
  description?: string
  image?: ImageNode
  author?: string
  updated?: string
  tags?: string[]
  linkurl?: string
  style?: {
    publicURL?: string
  }
  changelog?: string
  toc?: boolean
}

export interface Post {
  id?: string
  html?: string
  excerpt?: string
  frontmatter: Frontmatter
  fields?: Fields
  rawMarkdownBody?: string
  fileAbsolutePath?: string
  tableOfContents?: string
}

export interface PageContext {
  tag?: string
  slug: string
  currentPageNumber: number
  numPages: number
  prevPagePath?: string
  nextPagePath?: string
}
