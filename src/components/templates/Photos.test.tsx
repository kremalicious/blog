import React from 'react'
import { render } from '@testing-library/react'

import Photos from './Photos'
import data from '../../../.jest/__fixtures__/photos.json'

describe('/photos', () => {
  it('renders without crashing', () => {
    const pageContext = {
      slug: '/photos',
      currentPageNumber: 2,
      numPages: 20
    }

    const { container } = render(
      <Photos
        data={data}
        pageContext={pageContext}
        location={{ pathname: '/photos' } as any}
      />
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
