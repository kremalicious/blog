import { expect, test } from 'vitest'
import { normalizeAmount } from './normalizeAmount'

test('normalizeAmount replaces comma with a period', () => {
  const result = normalizeAmount('1,234')
  expect(result).toBe('1.234')
})

test('normalizeAmount removes non-digit and non-decimal characters', () => {
  const result = normalizeAmount('1234.56abc')
  expect(result).toBe('1234.56')
})

test('normalizeAmount removes non-digit and non-decimal characters', () => {
  const result = normalizeAmount('1234,56abc')
  expect(result).toBe('1234.56')
})
