import { createMarkdownProcessor } from '@astrojs/markdown-remark'

export async function markdownToHtml(markdown: string) {
  const processor = await createMarkdownProcessor()
  const { code } = await processor.render(markdown)
  return code
}
