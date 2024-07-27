import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import balanceMock from './__fixtures__/balance.json'
import * as rainbowkitMock from './__mocks__/@rainbow-me/rainbowkit'
import * as wagmiMock from './__mocks__/wagmi'
import * as wagmiActionsMock from './__mocks__/wagmi/actions'
import '@testing-library/jest-dom'

// viem uses TextEncoder and TextDecoder which are not available with jsdom 16+
import { TextDecoder, TextEncoder } from 'node:util'
Object.assign(global, { TextDecoder, TextEncoder })

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => null),
    removeItem: vi.fn(() => null),
    setItem: vi.fn(() => null)
  },
  writable: true
})

vi.mock('wagmi', () => wagmiMock)
vi.mock('wagmi/actions', () => wagmiActionsMock)
vi.mock('@rainbow-me/rainbowkit', () => rainbowkitMock)
vi.mock('@/features/Web3/hooks/useFetchTokens', () => ({
  useFetchTokens: () => ({ isLoading: false, data: balanceMock })
}))

// vi.mock('@/features/Web3/stores', () => ({
//   $selectedToken: balanceMock[0],
//   $amount: '1'
// }))

afterEach(() => {
  cleanup()
})
