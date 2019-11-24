import React from 'react'
import { render } from '@testing-library/react'
import { createHistory, createMemorySource } from '@reach/router'

import Tags from '../tags'

describe('/tags', () => {
  const history = createHistory(createMemorySource('/tags'))
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
      <Tags data={data} location={history.location} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
