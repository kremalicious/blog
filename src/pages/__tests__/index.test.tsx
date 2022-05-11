import React from 'react'
import { render } from '@testing-library/react'

import Home from '../index'
import data from '../../../.jest/__fixtures__/home.json'

describe('/', () => {
  it('renders without crashing', () => {
    const { container } = render(<Home data={data} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
