import React from 'react'
import { render } from '@testing-library/react'
import data from '../../../.jest/__fixtures__/home.json'
import Home from '../index'

describe('/', () => {
  it('renders without crashing', () => {
    // @ts-expect-error: only testing first render
    const { container } = render(<Home data={data as any} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
