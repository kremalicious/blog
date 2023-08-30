import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Header from '.'

describe('Header', () => {
  it('renders correctly', () => {
    const { container } = render(
      <div id="document">
        <Header />
      </div>
    )
    expect(container.firstChild).toBeInTheDocument()
    fireEvent.click(screen.getByTitle('Menu'))
    fireEvent.click(screen.getByTitle('Search'))

    const input = screen.getByPlaceholderText('Search everything')
    fireEvent.change(input, { target: { value: 'wallpaper' } })
  })
})
