import React from 'react'
import { render } from '@testing-library/react'
import Featured from './Featured'

describe('Featured', () => {
  it('renders correctly', () => {
    const { container } = render(<Featured />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
