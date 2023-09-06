import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import Conversion from './Conversion'

describe('Conversion', () => {
  it('renders without crashing', async () => {
    render(<Conversion amount="1" />)
  })
})
