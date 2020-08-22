import React from 'react'
import { render } from '@testing-library/react'

import Conversion from './Conversion'

describe('Conversion', () => {
  it('renders without crashing', async () => {
    const { findByText } = render(<Conversion amount={1} />)
    // const lazyElement = await findByText(/= €/)
    // expect(lazyElement).toBeInTheDocument()
  })
})
