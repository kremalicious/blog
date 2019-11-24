import React from 'react'
import { render } from '@testing-library/react'

import Changelog from './Changelog'

describe('Changelog', () => {
  it('renders without crashing', () => {
    const { container, rerender } = render(
      <Changelog repo="gatsby-plugin-matomo" />
    )
    expect(container.firstChild).toBeInTheDocument()

    // return nothing when no match
    rerender(<Changelog repo="nomatch" />)
    expect(container.firstChild).not.toBeInTheDocument()
  })
})
