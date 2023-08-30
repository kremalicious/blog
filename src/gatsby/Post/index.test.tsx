import React from 'react'
import { render } from '@testing-library/react'
import Post from '.'
import link from '../../../.config/jest/__fixtures__/link.json'
import post from '../../../.config/jest/__fixtures__/post.json'
import postWithMore from '../../../.config/jest/__fixtures__/postWithMore.json'

describe('Post', () => {
  const pageContext = {
    next: { title: 'hello', slug: '/hello' },
    prev: { title: 'hello2', slug: '/hello2' }
  }

  it('renders without crashing', () => {
    const { container, rerender } = render(
      <Post
        data={post as unknown as Queries.BlogPostBySlugQuery}
        pageContext={pageContext}
      />
    )
    expect(container.firstChild).toBeInTheDocument()

    rerender(
      <Post
        data={postWithMore as unknown as Queries.BlogPostBySlugQuery}
        pageContext={pageContext}
      />
    )
    rerender(<Post data={link} pageContext={pageContext} />)
  })
})
