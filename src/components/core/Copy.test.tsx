import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Copy from './Copy'

describe('Copy', () => {
  it('renders without crashing', () => {
    render(<Copy text="hello" />)
    fireEvent.click(screen.getByTitle('Copy to clipboard'))
  })
})
