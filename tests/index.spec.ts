import { test, expect } from '@playwright/test'
import config from '@config/blog.config'

test('meta is correct', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(RegExp(`${config.siteDescription}`, 'g'))
})

test('has articles & photos heading', async ({ page }) => {
  await page.goto('/')

  // Click the get started link.
  // await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Articles & Photos.
  await expect(page.getByRole('heading', { name: 'Articles' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Photos' })).toBeVisible()
})

test('all menu buttons are present', async ({ page }) => {
  await page.goto('/')

  const theme = page.getByTitle('Toggle Theme')
  const search = page.getByTitle('Search')
  const menu = page.getByTitle('Menu')

  await expect(theme).toBeVisible()
  await expect(search).toBeVisible()
  await expect(menu).toBeVisible()
})
