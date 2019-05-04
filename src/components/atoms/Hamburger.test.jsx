import React from 'react'
// import { render } from 'react-testing-library'
import testRender from '../../../jest/testRender'

import Hamburger from './Hamburger'

describe('Hamburger', () => {
  testRender(<Hamburger />)
})
