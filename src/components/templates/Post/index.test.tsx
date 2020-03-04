import React from 'react'
import { render } from '@testing-library/react'

import Post from '.'
import post from '../../../../jest/__fixtures__/post.json'
import postWithMore from '../../../../jest/__fixtures__/postWithMore.json'
import link from '../../../../jest/__fixtures__/link.json'

describe('Post', () => {
  const pageContext = {
    next: { title: 'hello', slug: '/hello' },
    prev: { title: 'hello2', slug: '/hello2' }
  }

  it('renders without crashing', () => {
    const { container, rerender } = render(
      <Post data={post} pageContext={pageContext} />
    )
    expect(container.firstChild).toBeInTheDocument()

    rerender(<Post data={postWithMore} pageContext={pageContext} />)
    rerender(<Post data={link} pageContext={pageContext} />)
  })
})
