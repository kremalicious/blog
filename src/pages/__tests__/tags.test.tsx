import React from 'react'
import { render } from '@testing-library/react'

import Tags from '../tags'

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
      <Tags data={data} location={{ pathname: '/tags' } as any} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
