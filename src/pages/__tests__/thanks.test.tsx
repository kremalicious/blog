import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import Thanks from '../thanks'

describe('/thanks', () => {
  it('renders without crashing', async () => {
    const { container } = render(<Thanks />)
    const lazyElement = await waitForElement(() =>
      container.querySelector('button')
    )
    expect(lazyElement).toBeInTheDocument()
  })
})
