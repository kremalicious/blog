import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useFetchTokens } from './useFetchTokens'

test('useFetchTokens does not fetch anything when no chain or address are present', async () => {
  vi.mock('wagmi', () => ({
    useNetwork: () => ({ chain: undefined }),
    useAccount: () => ({ address: undefined })
  }))

  function TestComponent() {
    const fetchResults = useFetchTokens()
    return <div>{fetchResults?.data ? 'Fetched' : 'Not fetched'}</div>
  }

  render(<TestComponent />)

  expect(screen.queryByText('Fetched')).toBeNull()
})