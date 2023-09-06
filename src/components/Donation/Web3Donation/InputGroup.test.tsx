import { fireEvent, render, screen } from '@testing-library/react'
import InputGroup from './InputGroup'

const setAmount = jest.fn()

describe('InputGroup', () => {
  it('renders without crashing', async () => {
    render(<InputGroup amount="1" setAmount={setAmount} />)

    const input = await screen.findByRole('textbox')
    const button = await screen.findByRole('button')
    fireEvent.change(input, { target: { value: '3' } })
    fireEvent.click(button)
    expect(setAmount).toHaveBeenCalled()
  })
})
