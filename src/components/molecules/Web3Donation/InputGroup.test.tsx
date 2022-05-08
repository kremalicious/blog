import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import InputGroup from './InputGroup'

const sendTransaction = jest.fn()

describe('InputGroup', () => {
  it('renders without crashing', async () => {
    const { container } = render(
      <InputGroup sendTransaction={sendTransaction} />
    )
    expect(container.firstChild).toBeInTheDocument()

    const input = container.querySelector('input')
    const button = container.querySelector('button')
    fireEvent.change(input, { target: { value: '3' } })
    fireEvent.click(button)
    expect(sendTransaction).toHaveBeenCalled()
  })
})
