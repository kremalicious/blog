import React from 'react'
import { render } from '@testing-library/react'

import Post from '.'
import data from '../../../jest/__fixtures__/post.json'

describe('Post', () => {
  const pageContext = {
    next: { title: 'hello', slug: '/hello' },
    prev: { title: 'hello2', slug: '/hello2' }
  }

  it('renders without crashing', () => {
    const { container } = render(<Post data={data} pageContext={pageContext} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
