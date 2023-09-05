import { visit } from 'unist-util-visit'
import { toHast } from 'mdast-util-to-hast'
import { toHtml } from 'hast-util-to-html'

/**
 * @typedef {import('hast').Root} HastRoot
 * @typedef {import('mdast').Root} MdastRoot
 * @type {import('unified').Plugin<MdastRoot, HastRoot>}
 */
export default function remarkLeadParagraph() {
  return (tree, file) => {
    if (!file.history[0].includes('articles')) return

    let firstParagraph = null

    // Find the first paragraph node
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!firstParagraph) {
        firstParagraph = node
        // Remove the first paragraph from the tree
        parent.children.splice(index, 1)
      }
    })

    if (firstParagraph) {
      const hast = toHast(firstParagraph)
      const html = toHtml(hast)

      // Add lead to frontmatter
      file.data.astro.frontmatter.lead = html
      return
    }
    return null // Return null if no first paragraph is found
  }
}
