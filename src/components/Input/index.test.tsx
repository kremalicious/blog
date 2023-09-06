import { render, screen } from '@testing-library/react'
import Input from '.'

describe('Input', async () => {
  render(<Input />)
  await screen.findByRole('textbox')
})
