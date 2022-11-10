import React from 'react'
import { render } from '@testing-library/react'

import Home from '../index'
import data from '../../../.jest/__fixtures__/home.json'

describe('/', () => {
  it('renders without crashing', () => {
    // @ts-expect-error: only testing first render
    const { container } = render(<Home data={data as any} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
