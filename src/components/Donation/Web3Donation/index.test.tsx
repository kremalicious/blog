import { test, expect } from 'vitest'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import Web3Donation from '.'

test('Web3Donation component', async () => {
  render(<Web3Donation address="0x456" />)

  const submitButton = screen.getByRole('button')
  expect(submitButton).toBeInTheDocument()

  const connectButton = screen.getByText('Connect Wallet')
  expect(connectButton).toBeInTheDocument()

  const input = screen.getByRole('textbox')
  expect(input).toBeInTheDocument()

  fireEvent.change(input, { target: { value: '1' } })
  expect(input).toHaveValue('1')

  // Simulate form submission
  fireEvent.click(submitButton)

  await waitFor(() => {
    const alert = screen.getByText(/Waiting for network confirmation/i)
    expect(alert).toBeInTheDocument()
  })
})