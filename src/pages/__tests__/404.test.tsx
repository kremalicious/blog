import React from 'react'
import { render } from '@testing-library/react'
import { createHistory, createMemorySource } from '@reach/router'

import NotFound from '../404'

describe('/404', () => {
  const history = createHistory(createMemorySource('/404'))
  it('renders without crashing', () => {
    const { container } = render(<NotFound location={history.location} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
