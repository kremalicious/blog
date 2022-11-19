import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ThemeSwitch from './ThemeSwitch'

describe('ThemeSwitch', () => {
  it('renders correctly', () => {
    const { container } = render(<ThemeSwitch />)
    const switchContainer = container.querySelector('aside')
    expect(switchContainer).toBeInTheDocument()
  })

  it('checkbox can be changed', () => {
    const { container } = render(<ThemeSwitch />)

    const toggle = container.querySelector('input')
    const label = container.querySelector('label')
    fireEvent.click(label)
    fireEvent.change(toggle, { target: { checked: true } })
  })
})
