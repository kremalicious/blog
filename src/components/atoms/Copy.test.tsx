import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Copy from './Copy'

describe('Copy', () => {
  it('renders without crashing', () => {
    render(<Copy text="hello" />)
    fireEvent.click(screen.getByTitle('Copy to clipboard'))
  })
})
