import { visit } from 'unist-util-visit'
import { toHast } from 'mdast-util-to-hast'
import { toHtml } from 'hast-util-to-html'
import { toString } from 'mdast-util-to-string'

/**
 * @typedef {import('hast').Root} HastRoot
 * @typedef {import('mdast').Root} MdastRoot
 * @type {import('unified').Plugin<MdastRoot, HastRoot>}
 */
export default function remarkLeadParagraph() {
  return (tree, file) => {
    let firstParagraph = null

    // Find the first paragraph node
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!firstParagraph) {
        firstParagraph = node

        // Remove the first paragraph from the tree,
        // but only in articles
        if (file.history[0].includes('articles'))
          parent.children.splice(index, 1)
      }
    })

    if (firstParagraph) {
      const hast = toHast(firstParagraph)
      const html = toHtml(hast)
      const string = toString(firstParagraph)

      // Add lead to frontmatter
      file.data.astro.frontmatter.lead = html
      file.data.astro.frontmatter.leadRaw = string

      return
    }
    return null // Return null if no first paragraph is found
  }
}
