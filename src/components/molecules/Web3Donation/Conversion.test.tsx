import React from 'react'
import { render } from '@testing-library/react'
import Conversion from './Conversion'

describe('Conversion', () => {
  it('renders without crashing', async () => {
    render(<Conversion amount="1" />)
  })
})
