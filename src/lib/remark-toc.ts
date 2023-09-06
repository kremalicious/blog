//
// Extract headings from markdown and add them as HTML to the frontmatter
// Similiar to https://github.com/remarkjs/remark-toc
//
import { toc } from 'mdast-util-toc'
import { toHast } from 'mdast-util-to-hast'
import { toHtml } from 'hast-util-to-html'
import type { Nodes } from 'node_modules/mdast-util-toc/lib'
import type { VFile } from 'vfile'

interface MyFile extends VFile {
  data: {
    astro: {
      frontmatter: {
        tableOfContents: string
      }
    }
  }
}

export default function remarkToc() {
  return (tree: Nodes, file: MyFile) => {
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
