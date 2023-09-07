// import { unified } from 'unified'
// import remarkParse from 'remark-parse'
// import remarkRehype from 'remark-rehype'
// import rehypeStringify from 'rehype-stringify'

import { renderMarkdown } from '@astrojs/markdown-remark'

export async function markdownToHtml(markdown: string) {
  const content = await renderMarkdown(markdown, { gfm: true })
  return content.code
  //   return await unified()
  //     .use(remarkParse)
  //     .use(remarkRehype)
  //     .use(rehypeStringify)
  //     .process(markdown)
}
