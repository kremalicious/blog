//
// Extract headings from markdown and add them as HTML to the frontmatter
// Similiar to https://github.com/remarkjs/remark-toc
//
import { toc } from 'mdast-util-toc'
import { toHast } from 'mdast-util-to-hast'
import { toHtml } from 'hast-util-to-html'

/**
 * @typedef {import('hast').Root} HastRoot
 * @typedef {import('mdast').Root} MdastRoot
 * @type {import('unified').Plugin<MdastRoot, HastRoot>}
 */
export default function remarkToc() {
  return (tree, file) => {
    const result = toc(tree, { maxDepth: 3 })

    if (
      result.endIndex === null ||
      result.index === null ||
      result.index === -1 ||
      !result.map
    ) {
      return
    }

    const hast = toHast(result.map)
    const html = toHtml(hast)

    // Add toc to frontmatter
    file.data.astro.frontmatter.tableOfContents = html.toString()
  }
}
