import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { InputGroup } from '.'

describe('InputGroup', () => {
  it('renders without crashing', async () => {
    render(<InputGroup isDisabled={false} error={undefined} />)

    const input = await screen.findByRole('textbox')
    const button = await screen.findByRole('button')
    fireEvent.change(input, { target: { value: '3' } })
    fireEvent.click(button)
  })

  it('renders disabled', async () => {
    render(<InputGroup isDisabled={true} error={undefined} />)

    const input = await screen.findByRole('textbox')
    expect(input).toBeDefined()
    expect(input.attributes.getNamedItem('disabled')).toBeDefined()
  })

  it('renders error', async () => {
    render(<InputGroup isDisabled={false} error={'Hello Error'} />)

    const errorItem = await screen.findByText('Hello Error')
    expect(errorItem).toBeDefined()
  })
})
