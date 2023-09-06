import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import RelatedPosts from './RelatedPosts'

describe('RelatedPosts', () => {
  it('renders correctly', async () => {
    render(<RelatedPosts tags={['hello', 'design']} />)
    await screen.findByText('Related Posts')
    fireEvent.click(screen.getByText('Refresh'))
  })

  it('renders correctly as photos', async () => {
    render(<RelatedPosts tags={['hello', 'design']} isPhotos />)
    await screen.findByText('Related Photos')
  })
})
