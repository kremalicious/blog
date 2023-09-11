import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/gatsby-redirect-from/')
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

test('search ui is working', async ({ page }) => {
  const search = page.getByRole('button', { name: 'Search' })
  const emptyMessage = 'Awaiting your input fellow web wanderer'

  // Mock the api call before search
  await page.route('*/**/api/posts', async (route) => {
    const json = [
      { data: { title: 'MomCorp Wallpaper' }, slug: 'momcorp-wallpaper' }
    ]
    await route.fulfill({ json })
  })

  // open search
  await search.click()
  await expect(page.getByText(emptyMessage)).toBeVisible()

  // fill search field
  const searchField = page.getByPlaceholder('Search everything')
  searchField.focus()
  await searchField.fill('wallpaper')
  await expect(page.getByText(emptyMessage)).toBeHidden()
  await expect(page.getByText('No results found')).toBeHidden()
  await expect(page.getByText('MomCorp Wallpaper')).toBeVisible()

  // empty search field
  await searchField.fill('')
  await expect(page.getByText(emptyMessage)).toBeVisible()

  // close search
  await page.getByRole('button', { name: 'Close search' }).click()
  await expect(searchField).toBeHidden()
})

test('theme toggle is working', async ({ page }) => {
  const themeToggle = page.getByTitle('Toggle Theme')
  const htmlElement = page.locator('html')

  // Check initial theme (assuming it's 'light' by default)
  await expect(htmlElement).toHaveAttribute('data-theme', 'light')

  // Click to toggle theme
  await themeToggle.click()
  await expect(htmlElement).toHaveAttribute('data-theme', 'dark')

  // Click to toggle theme back
  await themeToggle.click()
  await expect(htmlElement).toHaveAttribute('data-theme', 'light')
})
