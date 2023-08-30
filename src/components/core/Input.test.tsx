import React from 'react'
// import { render } from '@testing-library/react'
import testRender from '../../../.config/jest/testRender'
import Input from './Input'

describe('Input', () => {
  testRender(<Input />)
})
