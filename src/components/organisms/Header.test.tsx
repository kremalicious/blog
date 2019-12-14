import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders correctly', () => {
    const { container, getByTitle, getByPlaceholderText } = render(
      <div id="document">
        <Header />
      </div>
    )
    expect(container.firstChild).toBeInTheDocument()
    fireEvent.click(getByTitle('Menu'))
    fireEvent.click(getByTitle('Search'))

    const input = getByPlaceholderText('Search everything')
    fireEvent.change(input, { target: { value: 'wallpaper' } })
  })
})
