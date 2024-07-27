import { expect, test } from 'vitest'
import { isUnhelpfulErrorMessage } from './isUnhelpfulErrorMessage'

test('returns true for unhelpful error messages', () => {
  const unhelpfulMessage = 'User rejected the request'
  expect(isUnhelpfulErrorMessage(unhelpfulMessage)).toBe(true)
})

test('returns false for helpful error messages', () => {
  const helpfulMessage = 'Error: Transaction has been reverted by the EVM'
  expect(isUnhelpfulErrorMessage(helpfulMessage)).toBe(false)
})
