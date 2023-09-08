import { test, expect } from '@playwright/test'

test('meta is correct', async ({ page }) => {
  await page.goto('/photos')
  await expect(page).toHaveTitle(/Photos/)
})
