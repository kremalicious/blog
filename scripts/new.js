import fs from 'fs'
import path from 'path'
import prepend from 'prepend'
import slugify from 'slugify'
import ora from 'ora'

const templatePath = path.join(__dirname, 'new.md')
const template = fs.readFileSync(templatePath).toString()

const spinner = ora('Adding new project').start()

if (!process.argv[2]) {
  spinner.fail('Use the format `npm run new -- Title of post`')
}

const title = process.argv[2]
spinner.text = `Adding '${title}'.`

const titleSlug = slugify(title, { lower: true })
const postsPath = path.join(__dirname, 'content', 'posts')
const newContents = template
  .split('TITLE')
  .join(title)
  .split('DATE')
  .join(Date.now())

// prepend(projects, newContents, error => {
//   if (error) spinner.fail(error)
//   spinner.succeed(`Added '${title}' to top of projects.yml file.`)
// })
