import React, { Suspense } from 'react'
import { render, waitForElement } from '@testing-library/react'

import Time from './Time'

describe('Time', () => {
  test('renders lazy', async () => {
    const { getByText } = render(
      <Suspense fallback="test loading">
        <Time date="2017/12/23" />
      </Suspense>
    )
    const lazyElement = await waitForElement(() => getByText(/years ago/i))
    expect(lazyElement).toBeInTheDocument()
  })
})
