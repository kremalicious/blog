import { render, screen } from '@testing-library/react'
import Input from '.'

test('Input', async () => {
  render(<Input />)
  await screen.findByRole('textbox')
})
