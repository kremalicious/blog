import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/thanks/')
})

test('meta is correct', async ({ page }) => {
  await expect(page).toHaveTitle(/Thanks/)
})

test('rainbowkit modal works', async ({ page }) => {
  // open and close modal
  const connectButton = page.getByTestId('rk-connect-button')
  await expect(connectButton).toBeVisible({ timeout: 20000 })
  await connectButton.click()
  await page.getByLabel('Close').click()
})
