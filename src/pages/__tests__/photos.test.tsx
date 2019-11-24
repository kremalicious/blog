import React from 'react'
import { render } from '@testing-library/react'
import { createHistory, createMemorySource } from '@reach/router'

import Photos from '../photos'
import data from '../../../jest/__fixtures__/photos.json'

describe('/photos', () => {
  const history = createHistory(createMemorySource('/photos'))

  it('renders without crashing', () => {
    const { container } = render(
      <Photos data={data} location={history.location} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
