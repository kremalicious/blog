import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import RelatedPosts from './RelatedPosts'

describe('RelatedPosts', () => {
  it('renders correctly', () => {
    const { container, rerender, getByText } = render(
      <RelatedPosts tags={['hello', 'design']} />
    )
    expect(container.firstChild).toBeInTheDocument()

    fireEvent.click(getByText('Refresh'))

    rerender(<RelatedPosts tags={['hello', 'design']} photos />)
  })
})
