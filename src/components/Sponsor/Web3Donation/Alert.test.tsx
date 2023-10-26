import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import Alert from './Alert'

describe('Alert', () => {
  it('renders without crashing', async () => {
    render(
      <Alert
        message={{ status: 'loading', text: 'Loading' }}
        transactionHash="0xxxx"
      />
    )
  })
})
