import React from 'react'
import { render } from '@testing-library/react'
import data from '../../../.jest/__fixtures__/photos.json'
import Photos from '.'

describe('/photos', () => {
  it('renders without crashing', () => {
    const pageContext = {
      slug: '/photos',
      currentPageNumber: 2,
      numPages: 20
    }

    const { container } = render(
      // @ts-expect-error: only testing first render
      <Photos
        data={data as unknown as Queries.PhotosTemplateQuery}
        pageContext={pageContext}
        location={{ pathname: '/photos' } as any}
      />
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
