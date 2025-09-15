import type { Root } from 'mdast'
import { VFile } from 'vfile'
import { expect, test } from 'vitest'
import { extractLeadParagraph, type MyFile } from './remark-lead-paragraph'

function createMockTree(title: string, lead: string, body: string): Root {
  return {
    type: 'root',
    children: [
      {
        type: 'heading',
        depth: 1,
        children: [{ type: 'text', value: title }]
      },
      {
        type: 'paragraph',
        children: [{ type: 'text', value: lead }]
      },
      {
        type: 'paragraph',
        children: [{ type: 'text', value: body }]
      }
    ]
  }
}

test('remarkLeadParagraph should extract the first paragraph', async () => {
  const file = new VFile({
    history: ['articles/my-article.md'],
    data: { astro: { frontmatter: { lead: '', leadRaw: '' } } }
  }) as MyFile

  const tree = createMockTree(
    'My Article',
    'This is the lead paragraph.',
    'This is another paragraph.'
  )

  extractLeadParagraph(tree, file)

  expect(file.data.astro.frontmatter.lead).toBe(
    '<p>This is the lead paragraph.</p>'
  )
  expect(file.data.astro.frontmatter.leadRaw).toBe(
    'This is the lead paragraph.'
  )
  // First paragraph is removed for articles
  expect(tree.children.length).toBe(2)
  expect(tree.children[0].type).toBe('heading')
  expect(tree.children[1].type).toBe('paragraph')
  // Remaining paragraph content
  // @ts-expect-error narrow for test
  expect(tree.children[1].children[0].value).toBe('This is another paragraph.')
})

test('remarkLeadParagraph should process photos but not remove the paragraph', async () => {
  const file = new VFile({
    history: ['photos/my-photo.md'],
    data: { astro: { frontmatter: { lead: '', leadRaw: '' } } }
  }) as MyFile

  const tree = createMockTree(
    'My Photo',
    'This is the lead paragraph.',
    'This is another paragraph.'
  )

  extractLeadParagraph(tree, file)

  expect(file.data.astro.frontmatter.lead).toBe(
    '<p>This is the lead paragraph.</p>'
  )
  expect(file.data.astro.frontmatter.leadRaw).toBe(
    'This is the lead paragraph.'
  )
  // Paragraph is not removed for photos
  expect(tree.children.length).toBe(3)
  expect(tree.children[1].type).toBe('paragraph')
  // @ts-expect-error narrow for test
  expect(tree.children[1].children[0].value).toBe('This is the lead paragraph.')
})
