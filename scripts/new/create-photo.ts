import { exec } from 'node:child_process'
import { existsSync, promises as fs, mkdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Ora } from 'ora'
import { readImageMetadata } from '../../src/features/posts/lib/exif/read-image-metadata.js'
import { slugify } from '../../src/lib/slugify/slugify.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const templatePathPhoto = path.join(__dirname, 'new-photo.md')

/**
 * Creates one or more photo posts
 * @param dest Destination directory
 * @param spinner Ora spinner for displaying progress
 * @param photos Single photo path or array of photo paths
 * @param photoTitle Optional title to use if no IPTC title is found
 * @returns A single file path string if one photo was processed, or an array of file paths if multiple photos were processed
 */
export async function createPhotoPost(
  dest: string,
  spinner: Ora,
  photos: string | string[],
  photoTitle?: string
): Promise<string | string[]> {
  // Convert single photo to array for consistent processing
  const photoArray = Array.isArray(photos) ? photos : [photos]
  const createdFiles: string[] = []

  for (const photo of photoArray) {
    let title: string | undefined
    let titleSlug: string
    let postPhotoFile = ''

    try {
      const templatePhoto = readFileSync(templatePathPhoto).toString()
      const exifData = await readImageMetadata(photo)
      if (!exifData) throw new Error(`No exif data found in image: ${photo}`)

      const { exif, iptc } = exifData
      title = iptc?.title || photoTitle
      if (!title) {
        throw new Error(
          `No title found for ${photo}. Add to IPTC, or use the format \`bun run new photo path/to/photo.jpg "Title of post"`
        )
      }
      spinner.text = `Adding '${title}'.`

      titleSlug = slugify(title)
      const date = exif?.date || new Date().toISOString()
      const dateShort = date.slice(0, 10)
      const description = iptc?.caption
      const folderName = `${dateShort}-${titleSlug}`
      const destination = `${dest}/${folderName}`
      postPhotoFile = `${destination}/index.md`

      const newContentsPhoto = templatePhoto
        .split('TITLE')
        .join(title)
        .split('SLUG')
        .join(titleSlug)
        .split('DATE_LONG')
        .join(date)
        .split('DATE_SHORT')
        .join(dateShort)
        .split('DESCRIPTION')
        .join(description)
        .replace(/\r\n/g, '\n') // Normalize line endings to LF

      // copy photo file in place
      if (!existsSync(destination)) mkdirSync(destination, { recursive: true })
      await fs.copyFile(photo, `${destination}/${folderName}.jpg`)

      // write IPTC copyright data into photo file with `bun run iptc:add`
      await new Promise((resolve, reject) => {
        exec(`bun run iptc:add ${destination}/`, (error) => {
          if (error) {
            spinner.fail(`Error adding IPTC data: ${error.message}`)
            reject(error)
          } else {
            resolve(true)
          }
        })
      })

      // create photo post file
      await fs.writeFile(postPhotoFile, newContentsPhoto, 'utf8')
      spinner.succeed(
        `New photo post '${title}' under '${postPhotoFile}' created.`
      )

      createdFiles.push(postPhotoFile)
    } catch (error: unknown) {
      spinner.fail(`Error processing ${photo}: ${(error as Error).message}`)
      throw error
    }
  }

  return Array.isArray(photos) ? createdFiles : createdFiles[0]
}
