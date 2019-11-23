import React, { Suspense } from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'

import Qr from './Qr'

describe('Qr', () => {
  test('renders lazy', async () => {
    const { container } = render(
      <Suspense fallback="test loading">
        <Qr address="xxx" />
      </Suspense>
    )
    const lazyElement = await waitForElement(() =>
      container.querySelector('button')
    )
    expect(lazyElement).toBeInTheDocument()
    fireEvent.click(container.querySelector('button'))
  })
})
