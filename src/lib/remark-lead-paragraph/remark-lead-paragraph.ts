import { toHtml } from 'hast-util-to-html'
import { toHast } from 'mdast-util-to-hast'
import { toString as toStringMdast } from 'mdast-util-to-string'
import type { Paragraph } from 'node_modules/mdast-util-to-hast/lib/handlers/paragraph'
import type { Transformer } from 'unified'
import { type Visitor, visit } from 'unist-util-visit'
import type { VFile } from 'vfile'

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

export function remarkLeadParagraph(): Transformer {
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
      const string = toStringMdast(firstParagraph)

      // Add lead to frontmatter
      ;(file.data as MyFile['data']).astro.frontmatter.lead = html
      ;(file.data as MyFile['data']).astro.frontmatter.leadRaw = string

      return
    }
  }
}
