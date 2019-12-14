import React from 'react'
import { render } from '@testing-library/react'
import PostTeaser from './PostTeaser'
import post from '../../../jest/__fixtures__/post.json'

describe('PostTeaser', () => {
  it('renders correctly', () => {
    const { container, rerender } = render(<PostTeaser post={post.post} />)
    expect(container.firstChild).toBeInTheDocument()

    rerender(<PostTeaser post={post.post} toggleSearch={() => null} />)
  })
})
