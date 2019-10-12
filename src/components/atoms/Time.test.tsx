import React from 'react'
// import { render } from '@testing-library/react'
import testRender from '../../../jest/testRender'

import Time from './Time'

describe('Time', () => {
  testRender(<Time date="2017/12/23" />)
})
