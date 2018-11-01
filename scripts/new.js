import fs from 'fs-extra'
import path from 'path'
import slugify from 'slugify'
import ora from 'ora'

const templatePath = path.join(__dirname, 'new.md')
const template = fs.readFileSync(templatePath).toString()

const spinner = ora('Adding new project').start()

if (!process.argv[2]) {
  spinner.fail('Use the format `npm run new "Title of post"`')
}

const title = process.argv[2]
spinner.text = `Adding '${title}'.`

const titleSlug = slugify(title, { lower: true })
const postsPath = path.join('.', 'content', 'posts')
const date = new Date().toISOString()
const newContents = template
  .split('TITLE')
  .join(title)
  .split('TITLE_SLUG')
  .join(titleSlug)
  .split('DATE')
  .join(date)

const datePath = date.slice(0, 10)
const file = `${postsPath}/${datePath}-${titleSlug}/index.md`

fs.outputFile(file, newContents)
  .then(() => fs.readFile(file, 'utf8'))
  .then(() => {
    spinner.succeed(`New post '${title}' created.`)
  })
  .catch(err => {
    spinner.fail(`Error creating post: ${err}`)
  })

// fs.appendFile(`${postsPath}/${datePath}-${titleSlug}.md`, newContents, err => {
//   if (err) spinner.fail(`Error creating post: ${err}`)
//   spinner.succeed(`New post '${title}' created.`)
// })
