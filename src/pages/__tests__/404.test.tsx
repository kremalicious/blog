import React from 'react'
import { render } from '@testing-library/react'

import NotFound from '../404'

describe('/404', () => {
  it('renders without crashing', () => {
    const { container } = render(<NotFound />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
