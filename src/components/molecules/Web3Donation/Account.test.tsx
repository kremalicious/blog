import React from 'react'
import { render } from '@testing-library/react'

import Account from './Account'

describe('Account', () => {
  it('renders without crashing', () => {
    const { container } = render(<Account />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
