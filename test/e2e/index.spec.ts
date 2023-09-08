import { test, expect } from '@playwright/test'
import config from '@config/blog.config'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('meta is correct', async ({ page }) => {
  await expect(page).toHaveTitle(RegExp(`${config.siteDescription}`, 'g'))
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    RegExp(`${config.siteDescription}`, 'g')
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    config.siteUrl
  )
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    config.siteUrl
  )
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    config.siteDescription
  )
})

test('has articles & photos heading', async ({ page }) => {
  // Click the get started link.
  // await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Articles & Photos.
  await expect(page.getByRole('heading', { name: 'Articles' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Photos' })).toBeVisible()
})
