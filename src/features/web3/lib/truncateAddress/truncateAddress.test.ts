import { expect, test } from 'vitest'
import { truncateAddress } from './truncateAddress'

test('truncateAddress', () => {
  const address = '0x1234567890abcdef'
  const truncated = truncateAddress(address)

  expect(truncated.startsWith('0x1234')).toBe(true)
  expect(truncated.endsWith('cdef')).toBe(true)
  expect(truncated).toBe('0x1234...cdef')
})
