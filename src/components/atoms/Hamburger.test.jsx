import React from 'react'
// import { render } from '@testing-library/react'
import testRender from '../../../jest/testRender'

import Hamburger from './Hamburger'

describe('Hamburger', () => {
  testRender(<Hamburger />)
})
