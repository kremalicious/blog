import { render, screen } from '@testing-library/react'
import { test } from 'vitest'
import Input from '.'

test('Input', async () => {
  render(<Input />)
  await screen.findByRole('textbox')
})
