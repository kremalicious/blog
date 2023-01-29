import React from 'react'
import { render } from '@testing-library/react'
import data from '../../../.jest/__fixtures__/posts.json'
import Archive from './Archive'

describe('Archive', () => {
  const pageContext = {
    tag: 'hello',
    slug: '/hello',
    currentPageNumber: 2,
    numPages: 20
  }

  it('renders without crashing', () => {
    const { container } = render(
      <Archive
        data={data as unknown as Queries.ArchiveTemplateQuery}
        pageContext={pageContext}
      />
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
