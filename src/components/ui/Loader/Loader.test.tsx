import { render } from '@testing-library/react'
import { test } from 'vitest'
import { Loader } from './Loader'

test('Loader', async () => {
  render(<Loader />)
})
