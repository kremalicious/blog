import React from 'react'
import { render } from '@testing-library/react'
import post from '../../../.jest/__fixtures__/post.json'
import PostTeaser from './PostTeaser.astro'

describe('PostTeaser', () => {
  it('renders correctly', () => {
    const { container, rerender } = render(
      <PostTeaser post={post.post as unknown as Queries.PostTeaserFragment} />
    )
    expect(container.firstChild).toBeInTheDocument()

    rerender(
      <PostTeaser
        post={post.post as unknown as Queries.PostTeaserFragment}
        toggleSearch={() => null}
      />
    )
  })
})
