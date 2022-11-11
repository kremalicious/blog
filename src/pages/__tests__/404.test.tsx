import React from 'react'
import { render } from '@testing-library/react'
import NotFound from '../404'

describe('/404', () => {
  it('renders without crashing', () => {
    const { container } = render(
      // @ts-expect-error: only testing first render
      <NotFound location={{ pathname: '/tags' } as any} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
