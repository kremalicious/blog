import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/thanks/')
})

test('meta is correct', async ({ page }) => {
  await expect(page).toHaveTitle(/Thanks/)
})

test('rainbowkit modal works', async ({ page }) => {
  // open and close modal
  await expect(page.getByTestId('rk-connect-button')).toBeVisible()
  await page.getByTestId('rk-connect-button').click()
  await page.getByLabel('Close').click()
})
