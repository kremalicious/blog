import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/404')
})

test('matches screenshot', async ({ page }) => {
  await expect(page.locator('header[role="banner"]')).toHaveScreenshot()
})

test('all menu buttons are present', async ({ page }) => {
  const theme = page.getByTitle('Toggle Theme')
  const search = page.getByRole('button', { name: 'Search' })
  const menu = page.getByRole('button', { name: 'Menu' })

  await expect(theme).toBeVisible()
  await expect(search).toBeVisible()
  await expect(menu).toBeVisible()
})

test('page menu is working', async ({ page }) => {
  const menuButton = page.getByRole('button', { name: 'Menu' })
  const menu = page.locator('nav[aria-label="Pages"]')
  const body = page.locator('body')

  expect(menu).toBeHidden()
  expect(body).not.toHaveClass(/has-menu-open/)

  // open menu
  await menuButton.click()
  await expect(menu).toBeVisible()
  await expect(body).toHaveClass(/has-menu-open/)

  // close menu
  await menuButton.click()
  await expect(menu).toBeHidden()
  await expect(body).not.toHaveClass('has-menu-open')
})

test('search is working', async ({ page }) => {
  const search = page.getByRole('button', { name: 'Search' })

  // open search
  await search.click()

  // fill search field
  const searchField = page.getByPlaceholder('Search everything')
  await searchField.fill('wallpaper')
  expect(page.getByText('MomCorp Wallpaper')).toBeDefined()

  // close search
  await page.getByRole('button', { name: 'Close search' }).click()
})
