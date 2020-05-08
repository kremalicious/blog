import fs from 'fs-extra'
import path from 'path'
import slugify from 'slugify'
import ora from 'ora'
import fastExif from 'fast-exif'
import iptc from 'node-iptc'

const templatePath = path.join(__dirname, 'new.md')
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

let titleSlug = slugify(title, { lower: true })
const postsPath = path.join('.', 'content', 'posts')
const photosPath = path.join('.', 'content', 'photos')

let date = new Date().toISOString()

async function getIptc(imagePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(imagePath, (err, data) => {
      if (err) reject(err)
      const iptcData = iptc(data)
      return resolve(iptcData)
    })
  })
}

async function getExif(imagePath) {
  let exifData
  try {
    exifData = await fastExif.read(imagePath, true)
  } catch (error) {
    return null
  }

  let iptcData
  try {
    iptcData = await getIptc(imagePath)
  } catch (error) {
    return null
  }

  return { ...exifData, iptc: { ...iptcData } }
}

async function createPhotoPost() {
  const photo = process.argv[3]
  try {
    const exifData = await getExif(photo)
    title = exifData.iptc.object_name || exifData.iptc.title
    titleSlug = slugify(title, { lower: true })
    date = new Date(exifData.exif.DateTimeOriginal).toISOString()
    const dateShort = date.slice(0, 10)
    const description = exifData.iptc.caption
    const fileName = `${dateShort}-${titleSlug}`
    const postPhoto = `${photosPath}/${fileName}.md`

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

    // copy photo file in place
    fs.copyFile(photo, `${photosPath}/${fileName}.jpg`, (err) => {
      if (err) spinner.fail(`Error copying photo file: ${err}`)
    })

    // create photo post file
    fs.appendFile(postPhoto, newContentsPhoto, (err) => {
      if (err) spinner.fail(`Error creating photo post: ${err}`)
      spinner.succeed(`New photo post '${title}' as '${fileName}.md' created.`)
    })
  } catch (error) {
    console.error(error.message)
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

  fs.outputFile(file, newContents)
    .then(() => fs.readFile(file, 'utf8'))
    .then(() => spinner.succeed(`New post '${title}' created.`))
    .catch((err) => spinner.fail(`Error creating post: ${err}`))
}
