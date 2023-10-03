import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto(`/thanks/`)
})

test('meta is correct', async ({ page }) => {
  await expect(page).toHaveTitle(/Thanks/)
})

test('rainbowkit works', async ({ page }) => {
  // open and close modal
  await page.getByTestId('rk-connect-button').click()
  await page.getByLabel('Close').click()
})
