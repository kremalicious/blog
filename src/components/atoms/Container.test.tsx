import React from 'react'
// import { render } from '@testing-library/react'
import testRender from '../../../jest/testRender'

import Container from './Container'

describe('Container', () => {
  testRender(<Container>Hello</Container>)
})
