import fs from 'node:fs/promises'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { slugify } from '../../src/lib/slugify'
import type { Ora } from 'ora'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const templatePath = path.join(__dirname, 'new-article.md')

export async function createArticlePost(
  dest: string,
  spinner: Ora,
  title: string,
  newDate?: string
) {
  let file
  const date = newDate
    ? new Date(newDate).toISOString()
    : new Date().toISOString()

  spinner.text = `Adding '${title}'.`

  try {
    const titleSlug = slugify(title)
    const dateShort = date.slice(0, 10)
    const folderName = `${dateShort}-${titleSlug}`
    const destination = `${dest}/${folderName}`
    file = `${destination}/index.md`
    const template = readFileSync(templatePath).toString()
    const newContents = template
      .split('TITLE')
      .join(title)
      .split('SLUG')
      .join(titleSlug)
      .split('DATE')
      .join(date)

    // Create the destination folder if it doesn't exist
    if (!existsSync(destination)) {
      mkdirSync(destination, { recursive: true })
    }

    // create post file
    await fs.appendFile(file, newContents)
    spinner.succeed(`New post '${title}' created.`)
  } catch (error: any) {
    spinner.fail((error as Error).message)
  }

  return file
}
