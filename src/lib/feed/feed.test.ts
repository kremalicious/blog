import { it, describe, expect } from 'vitest'
import { getFeedContent } from '.'

describe('getFeedContent', () => {
  it('should generate post feed content with an image', async () => {
    const mockPost = {
      body: 'Mock post content in markdown format',
      data: { image: { src: 'https://example.com/image.jpg' } }
    }

    const feedContent = await getFeedContent(mockPost as any)

    expect(feedContent).toContain('<img src="https://example.com/image.jpg" />')
    expect(feedContent).toContain('Mock post content in markdown format')
    expect(feedContent).toContain(
      'This post was published on <a href="https://kremalicious.com">kremalicious.com</a>'
    )
  })

  it('should generate post feed content without an image', async () => {
    const mockPost = {
      body: 'Mock post content in markdown format',
      data: {}
    }

    const feedContent = await getFeedContent(mockPost as any)

    expect(feedContent).not.toContain('<img src="')
    expect(feedContent).toContain('Mock post content in markdown format')
    expect(feedContent).toContain(
      'This post was published on <a href="https://kremalicious.com">kremalicious.com</a>'
    )
  })
})
