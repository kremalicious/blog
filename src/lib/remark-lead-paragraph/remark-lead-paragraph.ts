import { toHtml } from 'hast-util-to-html'
import type { Paragraph, Root } from 'mdast'
import { toHast } from 'mdast-util-to-hast'
import { toString as toStringMdast } from 'mdast-util-to-string'
import type { Plugin } from 'unified'
import { type Visitor, visit } from 'unist-util-visit'
import type { VFile } from 'vfile'

export interface MyFile extends VFile {
  data: {
    astro: { frontmatter: { lead: string; leadRaw: string } }
  }
}

export function extractLeadParagraph(tree: Root, file: MyFile): void {
  let firstParagraph: Paragraph | undefined

  const visitor: Visitor<Paragraph> = (node, index, parent) => {
    if (firstParagraph) return
    firstParagraph = node
    if (file.history[0]?.includes('articles'))
      parent?.children.splice(index as number, 1)
  }
  visit(tree, 'paragraph', visitor)

  if (!firstParagraph) return

  const hast = toHast(firstParagraph)
  const html = toHtml(hast)
  const string = toStringMdast(firstParagraph)

  const data = file.data as MyFile['data']
  if (!data.astro) data.astro = { frontmatter: { lead: '', leadRaw: '' } }
  if (!data.astro.frontmatter)
    data.astro.frontmatter = { lead: '', leadRaw: '' }
  data.astro.frontmatter.lead = html
  data.astro.frontmatter.leadRaw = string
}

export const remarkLeadParagraph: Plugin<[], Root> = () => {
  return (tree, file) => {
    extractLeadParagraph(tree as Root, file as MyFile)
  }
}
