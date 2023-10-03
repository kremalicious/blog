import { test, expect } from '@playwright/test'
import siteConfig from '@config/blog.config'

const postSlug = 'gatsby-redirect-from'
const canonical = `${siteConfig.siteUrl}/${postSlug}`

test.beforeEach(async ({ page }) => {
  await page.goto(`/${postSlug}/`)
})

test('meta is correct', async ({ page }) => {
  await expect(page).toHaveTitle(/Redirect Plugin for Markdown Pages in Gatsby/)

  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    /Redirect Plugin for Markdown Pages in Gatsby/
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    canonical
  )
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    canonical
  )
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Plugin for Gatsby to create redirects based on a list in your Markdown frontmatter, mimicking the behavior of jekyll-redirect-from.'
  )
})
