import fs from 'fs-extra'
import path from 'path'
import slugify from 'slugify'
import ora from 'ora'

const templatePath = path.join(__dirname, 'new.md')
const templatePathPhoto = path.join(__dirname, 'new-photo.md')
const template = fs.readFileSync(templatePath).toString()
const templatePhoto = fs.readFileSync(templatePathPhoto).toString()

const spinner = ora('Adding new post').start()

if (!process.argv[2]) {
  spinner.fail('Use the format `npm run new "Title of post"`')
}

const title = process.argv[2]
const isPhoto = process.argv[3] === 'photo'

spinner.text = `Adding '${title}'.`

const titleSlug = slugify(title, { lower: true })
const postsPath = path.join('.', 'content', 'posts')
const photosPath = path.join('.', 'content', 'photos')

let date = new Date().toISOString()

if (isPhoto) {
  if (process.argv[4]) {
    date = new Date(process.argv[4]).toISOString()
  }

  const dateShort = date.slice(0, 10)
  const filePhoto = `${photosPath}/${dateShort}-${titleSlug}.md`

  const newContentsPhoto = templatePhoto
    .split('TITLE')
    .join(title)
    .split('SLUG')
    .join(titleSlug)
    .split('DATE_LONG')
    .join(date)
    .split('DATE_SHORT')
    .join(dateShort)

  fs.appendFile(filePhoto, newContentsPhoto, err => {
    if (err) spinner.fail(`Error creating photo post: ${err}`)
    spinner.succeed(
      `New photo post '${title}' created.\n\n  Use ${dateShort}-${titleSlug}.jpg as the photo file name.`
    )
  })
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
    .catch(err => spinner.fail(`Error creating post: ${err}`))
}
