import { test, expect } from 'vitest'
import slugify, { slugifyAll } from './slugify'

test('slugify should convert text to slug', () => {
  const text = 'Hello World!'
  const expected = 'hello-world'
  const result = slugify(text)
  expect(result).toBe(expected)
})

test('slugify should remove special characters', () => {
  const text = 'Hello*+~.()\'"!:@ World!'
  const expected = 'hello-world'
  const result = slugify(text)
  expect(result).toBe(expected)
})

test('slugifyAll should convert an array of texts to slugs', () => {
  const texts = ['Hello World!', 'Another Text']
  const expected = ['hello-world', 'another-text']
  const result = slugifyAll(texts)
  expect(result).toEqual(expected)
})
