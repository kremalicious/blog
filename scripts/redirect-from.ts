//
// astro-redirect-from
//
import fs from 'node:fs/promises'
import path from 'node:path'
import frontmatter from 'front-matter'
import ora from 'ora'
import chalk from 'chalk'

const contentDir = 'content/'
const outputFilePath = '.config/redirects.json'
let fileCount = 0

type Frontmatter = { redirect_from?: string[]; slug?: string }

const spinner = ora(
  `${chalk.bold('[redirect-from]')} Extract redirects`
).start()

async function findMarkdownFilesWithRedirects(
  dir: string
): Promise<{ [old: string]: string }> {
  const redirects: { [old: string]: string } = {}

  async function processDir(currentDir: string) {
    const items = await fs.readdir(currentDir, { recursive: true })

    for (const item of items) {
      const itemPath = path.join(currentDir, item)
      const stats = await fs.stat(itemPath)

      if (
        stats.isFile() &&
        item.endsWith('.md') &&
        !itemPath.includes('links')
      ) {
        const fileContent = await fs.readFile(itemPath, 'utf-8')
        const { attributes }: { attributes: Frontmatter } =
          frontmatter(fileContent)

        // construct slug from frontmatter or folder name
        const postSlug =
          attributes.slug || `/${itemPath.split('/')[2].substring(11)}`

        // Check if the Markdown file has a redirect_from field
        if (attributes.redirect_from) {
          fileCount++
          const redirectFromSlugs = attributes.redirect_from
          for (const slug of redirectFromSlugs) {
            // Add entries to the redirects object
            redirects[slug] = postSlug
          }
        }
      }
    }
  }

  await processDir(dir)
  return redirects
}

try {
  const redirects = await findMarkdownFilesWithRedirects(contentDir)
  const redirectsJSON = JSON.stringify(redirects, null, 2)

  // Write the redirects object to the output file
  fs.writeFile(outputFilePath, redirectsJSON, 'utf-8')

  spinner.succeed(
    `${chalk.bold('[redirect-from]')} Extracted ${
      Object.keys(redirects).length
    } redirects from ${fileCount} files to ${outputFilePath}`
  )
} catch (error: any) {
  spinner.fail(`${chalk.bold('[redirect-from]')} ${(error as Error).message}`)
}
