import React, { Suspense } from 'react'
import { render, waitFor } from '@testing-library/react'

import Qr from './Qr'

describe('Qr', () => {
  test('renders lazy', async () => {
    const { container } = render(
      <Suspense fallback="test loading">
        <Qr address="xxx" />
      </Suspense>
    )
    expect(container.firstChild).toBeInTheDocument()
    await waitFor(() => container.querySelector('button'))
  })
})
