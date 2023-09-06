import { visit } from 'unist-util-visit'
import { toHast } from 'mdast-util-to-hast'
import { toHtml } from 'hast-util-to-html'
import { toString } from 'mdast-util-to-string'
import type { VFile } from 'vfile'
import type { Node, Parent } from 'unist'

interface MyFile extends VFile {
  data: {
    astro: {
      frontmatter: {
        lead: string
        leadRaw: string
      }
    }
  }
}

export default function remarkLeadParagraph() {
  return (tree: Node, file: MyFile) => {
    let isFirstParagraph = false
    let firstParagraph

    // Find the first paragraph node
    visit(tree, 'paragraph', (node: Node, index: number, parent: Parent) => {
      if (!isFirstParagraph) {
        isFirstParagraph = true
        firstParagraph = node

        // Remove the first paragraph from the tree,
        // but only in articles
        if (file.history[0].includes('articles'))
          parent.children.splice(index, 1)
      }
    })

    if (isFirstParagraph) {
      const hast = toHast(firstParagraph as any)
      const html = toHtml(hast)
      const string = toString(firstParagraph as unknown as Node)

      // Add lead to frontmatter
      file.data.astro.frontmatter.lead = html
      file.data.astro.frontmatter.leadRaw = string

      return
    }
    return null // Return null if no first paragraph is found
  }
}
