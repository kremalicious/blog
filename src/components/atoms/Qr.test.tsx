import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Qr from './Qr'

describe('Qr', () => {
  it('renders without crashing', () => {
    const { container } = render(<Qr address="xxx" />)
    expect(container.firstChild).toBeInTheDocument()
    fireEvent.click(container.querySelector('button'))
  })
})
