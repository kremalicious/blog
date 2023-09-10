import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { VFile } from 'vfile'
import { test, expect } from 'vitest'
import remarkToc from './remark-toc' // Replace with the actual path

const expectedToc: string = `<ul>
<li>
<p><a href="#heading-1">Heading 1</a></p>
<ul>
<li>
<p><a href="#heading-2">Heading 2</a></p>
<ul>
<li><a href="#heading-3">Heading 3</a></li>
</ul>
</li>
</ul>
</li>
</ul>`

test('remarkToc should generate table of contents for articles', async () => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkToc)
    .use(remarkRehype)
    .use(rehypeStringify)

  const file = new VFile({
    value: '# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4',
    history: ['articles/my-article.md'],
    data: { astro: { frontmatter: { tableOfContents: '' } } }
  })

  await processor.process(file)

  expect((file.data as MyFile['data']).astro.frontmatter.tableOfContents).toBe(
    expectedToc
  )
})

test('remarkToc should not generate table of contents if no headings', async () => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkToc)
    .use(remarkRehype)
    .use(rehypeStringify)

  const file = new VFile({
    value: 'This is a paragraph.',
    history: ['articles/my-article.md'],
    data: { astro: { frontmatter: { tableOfContents: '' } } }
  })

  await processor.process(file)

  expect((file.data as MyFile['data']).astro.frontmatter.tableOfContents).toBe(
    ''
  )
})

test('remarkToc should skip processing if path does not include "articles"', async () => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkToc)
    .use(remarkRehype)
    .use(rehypeStringify)

  const file = new VFile({
    value: '# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4',
    history: ['some-other-folder/my-article.md'],
    data: { astro: { frontmatter: { tableOfContents: '' } } }
  })

  await processor.process(file)

  expect((file.data as MyFile['data']).astro.frontmatter.tableOfContents).toBe(
    ''
  )
})
