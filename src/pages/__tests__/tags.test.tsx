import React from 'react'
import { render } from '@testing-library/react'
import Tags from '../../pages_gatsby/tags'

describe('/tags', () => {
  const data = {
    allMarkdownRemark: {
      group: [
        { fieldValue: 'android', totalCount: 2 },
        { fieldValue: 'aperture', totalCount: 18 }
      ]
    }
  }

  it('renders without crashing', () => {
    const { container } = render(
      // @ts-expect-error: only testing first render
      <Tags data={data} location={{ pathname: '/tags' } as any} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
