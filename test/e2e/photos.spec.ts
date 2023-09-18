import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/photos')
})

test('meta is correct', async ({ page }) => {
  await expect(page).toHaveTitle(/Photos/)
})
