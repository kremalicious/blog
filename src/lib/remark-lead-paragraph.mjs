export default function remarkLeadParagraph() {
  return function (tree, file) {
    // run only on articles
    if (!file.history[0].includes('articles')) return

    let lead = ''

    // Extract and concatenate the first paragraph's text
    const paragraphChilds = tree.children.filter(
      (child) => child.type === 'paragraph'
    )[0].children

    lead = paragraphChilds
      .map((child) =>
        child.type === 'link'
          ? `<a href="${child.url}">${child.children[0].value}</a>`
          : child.value
      )
      .join('')

    // Remove the paragraph from the tree
    // TODO: guarantee that the first children is actually the lead
    tree.children.splice(0, 1)

    // Add lead to frontmatter
    file.data.astro.frontmatter.lead = lead.toString()
  }
}
