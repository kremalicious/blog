import { test, expect } from '@playwright/test'

test.describe.configure({ mode: 'parallel' })

test.beforeEach(async ({ page }) => {
  await page.goto('/404')
})

test('matches screenshot', async ({ page }) => {
  await expect(page).toHaveScreenshot()
})

test('meta is correct', async ({ page }) => {
  await expect(page).toHaveTitle(/I'm sorry Dave/)
})
