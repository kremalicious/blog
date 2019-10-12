import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'

import Qr from './Qr'

describe('Qr', () => {
  it('renders without crashing', async () => {
    const { container } = render(<Qr address="xxx" />)
    expect(container.firstChild).toBeInTheDocument()
    fireEvent.click(container.querySelector('button'))
  })
})
