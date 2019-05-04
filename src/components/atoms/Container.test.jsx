import React from 'react'
// import { render } from 'react-testing-library'
import testRender from '../../../jest/testRender'

import Container from './Container'

describe('Container', () => {
  testRender(<Container>Hello</Container>)
})
