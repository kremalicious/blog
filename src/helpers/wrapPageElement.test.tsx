import React from 'react'
import { render } from '@testing-library/react'
import WrapPageElement from './wrapPageElement'

describe('wrapPageElement', () => {
  it('renders correctly', () => {
    const { container } = render(
      // @ts-expect-error: only testing first render
      <WrapPageElement element={'Hello'} props={'hello'} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
