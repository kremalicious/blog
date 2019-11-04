import React from 'react'
import { render } from '@testing-library/react'

import Exif from './Exif'

const exif = {
  formatted: {
    iso: '500',
    model: 'Canon',
    fstop: '7.2',
    shutterspeed: '200',
    focalLength: '200',
    lensModel: 'Hello',
    exposure: '200',
    gps: { latitude: '41.89007222222222', longitude: '12.491516666666666' }
  }
}

describe('Exif', () => {
  it('renders without crashing', () => {
    const { container } = render(<Exif exif={exif} />)

    expect(container.firstChild).toBeInTheDocument()
  })
})
