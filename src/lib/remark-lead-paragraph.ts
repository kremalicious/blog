import { visit, type Visitor } from 'unist-util-visit'
import { toHast } from 'mdast-util-to-hast'
import { toHtml } from 'hast-util-to-html'
import { toString } from 'mdast-util-to-string'
import { type VFile } from 'vfile'
import { type Transformer } from 'unified'
import type { Paragraph } from 'node_modules/mdast-util-to-hast/lib/handlers/paragraph'

export interface MyFile extends VFile {
  data: {
    astro: {
      frontmatter: {
        lead: string
        leadRaw: string
      }
    }
  }
}

export default function remarkLeadParagraph(): Transformer {
  return (tree, file) => {
    // Check if the file is the type we want to process
    if (!file.history[0]?.includes('articles')) return

    let firstParagraph: Paragraph | undefined

    // Find the first paragraph node
    const visitor: Visitor<Paragraph> = (node, index, parent) => {
      if (!firstParagraph) {
        firstParagraph = node

        // Remove the first paragraph from the tree
        parent?.children.splice(index as number, 1)
      }
    }
    visit(tree, 'paragraph', visitor)

    if (firstParagraph) {
      const hast = toHast(firstParagraph)
      const html = toHtml(hast)
      const string = toString(firstParagraph)

      // Add lead to frontmatter
      ;(file.data as MyFile['data']).astro.frontmatter.lead = html
      ;(file.data as MyFile['data']).astro.frontmatter.leadRaw = string

      return
    }
  }
}
