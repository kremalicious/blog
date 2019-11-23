import React from 'react'
import { render, waitForElement } from '@testing-library/react'

import Conversion from './Conversion'

describe('Conversion', () => {
  it('renders without crashing', async () => {
    const { getByText } = render(<Conversion amount={1} />)
    const lazyElement = await waitForElement(() => getByText(/= €/))
    expect(lazyElement).toBeInTheDocument()
  })
})
