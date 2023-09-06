import '@testing-library/jest-dom'
import './__mocks__/matchMedia'

// viem uses TextEncoder and TextDecoder which are not available with jsdom 16+
import { TextEncoder, TextDecoder } from 'util'
Object.assign(global, { TextDecoder, TextEncoder })
