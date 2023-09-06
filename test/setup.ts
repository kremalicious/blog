import { vi, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import './__mocks__/matchMedia'

// viem uses TextEncoder and TextDecoder which are not available with jsdom 16+
import { TextEncoder, TextDecoder } from 'node:util'
Object.assign(global, { TextDecoder, TextEncoder })

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => null),
    removeItem: vi.fn(() => null),
    setItem: vi.fn(() => null)
  },
  writable: true
})

vi.mock('wagmi')
vi.mock('@rainbow-me/rainbowkit')

afterEach(() => {
  cleanup()
})
