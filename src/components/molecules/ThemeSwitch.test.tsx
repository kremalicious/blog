import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import ThemeSwitch from './ThemeSwitch'

describe('ThemeSwitch', () => {
  afterEach(cleanup)

  it('renders correctly', () => {
    const { container } = render(<ThemeSwitch />)
    const switchContainer = container.querySelector('aside')
    expect(switchContainer).toBeInTheDocument()
  })

  it('checkbox can be changed', () => {
    const { container } = render(<ThemeSwitch />)

    const toggle = container.querySelector('input')
    const label = container.querySelector('label')
    expect(toggle.checked).toBeFalsy()
    fireEvent.click(label)
    fireEvent.change(toggle, { target: { checked: true } })
    expect(toggle.checked).toBeTruthy()
  })
})
