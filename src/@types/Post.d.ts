import { ImageNode } from './Image'

export interface Fields {
  slug: string
  date: string
  githubLink?: string
}

export interface Frontmatter {
  title: string
  type?: string
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
