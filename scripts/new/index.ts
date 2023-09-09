import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ora from 'ora'
import slugify from '../../src/lib/slugify.js'
import { readOutExif } from '../../src/lib/exif/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const templatePath = path.join(__dirname, 'new-article.md')
const templatePathPhoto = path.join(__dirname, 'new-photo.md')
const template = fs.readFileSync(templatePath).toString()
const templatePhoto = fs.readFileSync(templatePathPhoto).toString()

const spinner = ora('Adding new post').start()

if (!process.argv[2]) {
  spinner.fail('Use the format `npm run new "Title of post"`')
}

let title = process.argv[2]
const isPhoto = process.argv[2] === 'photo'

spinner.text = `Adding '${title}'.`

let titleSlug = slugify(title)
const postsPath = path.join('.', 'content', 'articles')
const photosPath = path.join('.', 'content', 'photos')

let date = new Date().toISOString()

async function createPhotoPost() {
  const photo = process.argv[3]
  const photoTitle = process.argv[4]

  try {
    const exifData = await readOutExif(photo)
    if (!exifData) throw new Error('No exif data found in image')
    const { iptc, exif } = exifData

    title = iptc?.object_name || iptc?.title || photoTitle
    if (!title)
      throw new Error(
        'No title given. Add to IPTC, or use the format `npm run new photo path/to/photo.jpg "Title of post"'
      )

    titleSlug = slugify(title)
    date = new Date(exif?.date).toISOString()
    const dateShort = date.slice(0, 10)
    const description = iptc?.caption
    const folderName = `${dateShort}-${titleSlug}`
    const destination = `${photosPath}/${folderName}`
    const postPhotoFile = `${destination}/index.md`

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

    // Create the destination folder if it doesn't exist
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true })
    }

    // copy photo file in place
    fs.copyFile(photo, `${destination}/${folderName}.jpg`, (err) => {
      if (err) {
        spinner.fail(`Error copying photo file: ${err}`)
        return
      }
    })

    // create photo post file
    fs.appendFile(postPhotoFile, newContentsPhoto, (err) => {
      if (err) {
        spinner.fail(`Error creating photo post: ${err}`)
        return
      }
      spinner.succeed(
        `New photo post '${title}' under '${postPhotoFile}' created.`
      )
    })
  } catch (error: any) {
    spinner.fail((error as Error).message)
  }
}

if (isPhoto) {
  createPhotoPost()
} else {
  if (process.argv[3]) {
    date = new Date(process.argv[3]).toISOString()
  }

  const dateShort = date.slice(0, 10)
  const file = `${postsPath}/${dateShort}-${titleSlug}/index.md`

  const newContents = template
    .split('TITLE')
    .join(title)
    .split('SLUG')
    .join(titleSlug)
    .split('DATE')
    .join(date)

  // create post file
  fs.appendFile(file, newContents, (err) => {
    if (err) {
      spinner.fail(`Error creating post: ${err}`)
      return
    }
    spinner.succeed(`New post '${title}' created.`)
  })
}
