import React from 'react'
import { render } from '@testing-library/react'
import { createHistory, createMemorySource } from '@reach/router'

import Posts from './Posts'
import data from '../../../jest/__fixtures__/posts.json'

describe('Post', () => {
  const history = createHistory(createMemorySource('/photos'))

  const pageContext = {
    tag: 'hello',
    slug: '/hello',
    currentPageNumber: 2,
    numPages: 20
  }

  it('renders without crashing', () => {
    const { container } = render(
      <Posts
        data={data}
        pageContext={pageContext}
        location={history.location}
      />
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
