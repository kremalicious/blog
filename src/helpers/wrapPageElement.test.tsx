import React from 'react'
import { render } from '@testing-library/react'
import WrapPageElement from './wrapPageElement'

describe('wrapPageElement', () => {
  it('renders correctly', () => {
    const { container } = render(
      <WrapPageElement element={'Hello'} props={'hello'} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
