import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import InputGroup from './InputGroup'

const setAmount = jest.fn()

describe('InputGroup', () => {
  it('renders without crashing', async () => {
    const { container } = render(
      <InputGroup amount="1" setAmount={setAmount} />
    )
    expect(container.firstChild).toBeInTheDocument()

    const input = container.querySelector('input')
    const button = container.querySelector('button')
    fireEvent.change(input, { target: { value: '3' } })
    fireEvent.click(button)
    expect(setAmount).toHaveBeenCalled()
  })
})
