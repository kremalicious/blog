import path from 'node:path'
import ora from 'ora'
import { createArticlePost } from './create-article.js'
import { createPhotoPost } from './create-photo.js'
import { parsePhotoArgs } from './parse-photo-args.js'

const postsPath = path.join('.', 'content', 'articles')
const photosPath = path.join('.', 'content', 'photos')
const spinner = ora('Adding new post').start()

if (!process.argv[2]) {
  spinner.fail(
    'Use the format `bun run new "Title of post"` or `bun run new photo path/to/photo.jpg "Title of post"`'
  )
}

const isPhoto = process.argv[2] === 'photo'

if (isPhoto) {
  // Get all arguments after 'photo'
  const args = process.argv.slice(3)
  const { photos, photoTitle } = parsePhotoArgs(args)

  if (photos.length === 0) {
    spinner.fail(
      'No photo paths provided. Use the format `bun run new photo path/to/photo.jpg "Title of post"`'
    )
    process.exit(1)
  } else {
    spinner.text = `Processing ${photos.length} photo${photos.length > 1 ? 's' : ''}...`
    await createPhotoPost(photosPath, spinner, photos, photoTitle)
    spinner.stop()
    process.exit(0)
  }
} else {
  const title = process.argv[2]
  const newDate = process.argv[3]
  createArticlePost(postsPath, spinner, title, newDate)
  spinner.stop()
  process.exit(0)
}
