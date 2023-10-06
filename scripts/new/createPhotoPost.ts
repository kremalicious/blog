import { existsSync, mkdirSync, readFileSync, promises as fs } from 'node:fs'
import { slugify } from '../../src/lib/slugify/slugify.js'
import { readOutExif } from '../../src/lib/exif/readOutExif.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Ora } from 'ora'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const templatePathPhoto = path.join(__dirname, 'new-photo.md')

export async function createPhotoPost(
  dest: string,
  spinner: Ora,
  photo: string,
  photoTitle?: string
) {
  let title
  let titleSlug
  let date
  let postPhotoFile

  try {
    const templatePhoto = readFileSync(templatePathPhoto).toString()
    const exifData = await readOutExif(photo)
    if (!exifData) throw new Error('No exif data found in image')
    const { iptc, exif } = exifData

    title = iptc?.object_name || iptc?.title || photoTitle
    if (!title)
      throw new Error(
        'No title given. Add to IPTC, or use the format `npm run new photo path/to/photo.jpg "Title of post"'
      )
    spinner.text = `Adding '${title}'.`

    titleSlug = slugify(title)
    date = new Date(exif?.date).toISOString()
    const dateShort = date.slice(0, 10)
    const description = iptc?.caption
    const keywords = (iptc?.keywords as string[])?.join(`\n  - `)
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
      .split('TAGS')
      .join(keywords)

    // Create the destination folder if it doesn't exist
    if (!existsSync(destination)) {
      mkdirSync(destination, { recursive: true })
    }

    // copy photo file in place
    await fs.copyFile(photo, `${destination}/${folderName}.jpg`)

    // create photo post file
    await fs.appendFile(postPhotoFile, newContentsPhoto)
    spinner.succeed(
      `New photo post '${title}' under '${postPhotoFile}' created.`
    )
  } catch (error: any) {
    spinner.fail((error as Error).message)
  }

  return postPhotoFile
}
