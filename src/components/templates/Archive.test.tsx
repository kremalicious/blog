import React from 'react'
import { render } from '@testing-library/react'

import Archive from './Archive'
import data from '../../../.jest/__fixtures__/posts.json'

describe('Archive', () => {
  const pageContext = {
    tag: 'hello',
    slug: '/hello',
    currentPageNumber: 2,
    numPages: 20
  }

  it('renders without crashing', () => {
    const { container } = render(
      <Archive data={data} pageContext={pageContext} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
