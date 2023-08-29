import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import RelatedPosts from './RelatedPosts'

describe('RelatedPosts', () => {
  it('renders correctly', () => {
    const { container, rerender } = render(
      <RelatedPosts tags={['hello', 'design']} />
    )
    expect(container.firstChild).toBeInTheDocument()

    fireEvent.click(screen.getByText('Refresh'))

    rerender(<RelatedPosts tags={['hello', 'design']} isPhotos />)
  })
})
