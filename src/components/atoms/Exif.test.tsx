import React from 'react'
// import { render } from '@testing-library/react'
import testRender from '../../../jest/testRender'

import Exif from './Exif'

const exif = {
  iso: '500',
  model: 'Canon',
  fstop: '7.2',
  shutterspeed: '200',
  focalLength: '200',
  exposure: '200',
  gps: { latitude: '52.4792516', longitude: '13.431609' }
}

describe('Exif', () => {
  testRender(<Exif exif={exif} />)
})
