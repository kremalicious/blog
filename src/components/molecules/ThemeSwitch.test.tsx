import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import ThemeSwitch from './ThemeSwitch'

describe('ThemeSwitch', () => {
  it('renders correctly', async () => {
    render(<ThemeSwitch />)
    const element = await screen.findByTitle('Toggle Dark Mode')
    expect(element).toBeInTheDocument()
  })

  it('checkbox can be changed', () => {
    const { container } = render(<ThemeSwitch />)

    const toggle = container.querySelector('input')
    const label = container.querySelector('label')
    fireEvent.click(label)
    fireEvent.change(toggle, { target: { checked: true } })
  })
})
