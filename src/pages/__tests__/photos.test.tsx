import React from 'react'
import { render } from '@testing-library/react'

import Photos from '../photos'
import data from '../../../jest/__fixtures__/photos.json'

describe('/photos', () => {
  it('renders without crashing', () => {
    const { container } = render(<Photos data={data} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
