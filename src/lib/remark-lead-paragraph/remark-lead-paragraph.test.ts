import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import type { Processor } from 'unified'
import { unified } from 'unified'
import { VFile } from 'vfile'
import { beforeAll, expect, test } from 'vitest'
import { type MyFile, remarkLeadParagraph } from '.'

let processor: Processor<any, any, any, any, string>

beforeAll(() => {
  processor = unified()
    .use(remarkParse)
    .use(remarkLeadParagraph)
    .use(remarkRehype)
    .use(rehypeStringify)
})

test('remarkLeadParagraph should extract the first paragraph', async () => {
  const file = new VFile({
    value:
      '# My Article\n\nThis is the lead paragraph.\n\nThis is another paragraph.',
    history: ['articles/my-article.md'],
    data: { astro: { frontmatter: { lead: '', leadRaw: '' } } }
  })

  const result = await processor.process(file)

  expect((file.data as MyFile['data']).astro.frontmatter.lead).toBe(
    '<p>This is the lead paragraph.</p>'
  )
  expect((file.data as MyFile['data']).astro.frontmatter.leadRaw).toBe(
    'This is the lead paragraph.'
  )
  expect(String(result)).toBe(
    '<h1>My Article</h1>\n<p>This is another paragraph.</p>'
  ) // Assuming the first paragraph is removed
})

test('remarkLeadParagraph should process photos but not remove the paragraph', async () => {
  const file = new VFile({
    value:
      '# My Photo\n\nThis is the lead paragraph.\n\nThis is another paragraph.',
    history: ['photos/my-photo.md'],
    data: { astro: { frontmatter: { lead: '', leadRaw: '' } } }
  })

  const result = await processor.process(file)

  expect((file.data as MyFile['data']).astro.frontmatter.lead).toBe(
    '<p>This is the lead paragraph.</p>'
  )
  expect((file.data as MyFile['data']).astro.frontmatter.leadRaw).toBe(
    'This is the lead paragraph.'
  )
  expect(String(result)).toBe(
    '<h1>My Photo</h1>\n<p>This is the lead paragraph.</p>\n<p>This is another paragraph.</p>'
  ) // Paragraph should not be removed
})
