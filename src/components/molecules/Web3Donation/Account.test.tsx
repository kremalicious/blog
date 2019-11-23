import React from 'react'
import { render, waitForElement } from '@testing-library/react'

import Account from './Account'

describe('Account', () => {
  it('renders without crashing', async () => {
    const { container } = render(<Account />)
    const lazyElement = await waitForElement(() =>
      container.querySelector('.balance')
    )
    expect(lazyElement).toBeInTheDocument()
  })
})
