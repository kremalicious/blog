import { expect, test } from 'vitest'
import { getUmamiConfig } from '.'

test('should throw an error if Umami environment variables are missing in production', () => {
  const mockEnv = {
    // biome-ignore lint/style/useNamingConvention: external spec
    PROD: true,
    // biome-ignore lint/style/useNamingConvention: external spec
    PUBLIC_UMAMI_SCRIPT_URL: '',
    // biome-ignore lint/style/useNamingConvention: external spec
    PUBLIC_UMAMI_WEBSITE_ID: ''
  } as any

  expect(() => getUmamiConfig(mockEnv)).toThrow(
    'Missing Umami environment variables'
  )
})

test('should not throw an error if Umami environment variables are present in production', () => {
  // Mock production environment with Umami variables
  const mockEnv = {
    // biome-ignore lint/style/useNamingConvention: external spec
    PROD: true,
    // biome-ignore lint/style/useNamingConvention: external spec
    PUBLIC_UMAMI_SCRIPT_URL: 'https://example.com/umami.js',
    // biome-ignore lint/style/useNamingConvention: external spec
    PUBLIC_UMAMI_WEBSITE_ID: 'your-website-id'
  } as any

  expect(() => getUmamiConfig(mockEnv)).not.toThrow()
})

test('should not throw an error in non-production environments', () => {
  // Mock non-production environment
  const mockEnv = {
    // biome-ignore lint/style/useNamingConvention: external spec
    PROD: false,
    // biome-ignore lint/style/useNamingConvention: external spec
    PUBLIC_UMAMI_SCRIPT_URL: '',
    // biome-ignore lint/style/useNamingConvention: external spec
    PUBLIC_UMAMI_WEBSITE_ID: ''
  } as any

  expect(() => getUmamiConfig(mockEnv)).not.toThrow()
})
