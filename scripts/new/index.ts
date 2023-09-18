import path from 'node:path'
import ora from 'ora'
import { createPhotoPost } from './createPhotoPost.js'
import { createArticlePost } from './createArticlePost.js'

const postsPath = path.join('.', 'content', 'articles')
const photosPath = path.join('.', 'content', 'photos')
const spinner = ora('Adding new post').start()

if (!process.argv[2]) {
  spinner.fail(
    'Use the format `npm run new "Title of post"` or `npm run new photo path/to/photo.jpg`'
  )
}

const isPhoto = process.argv[2] === 'photo'

if (isPhoto) {
  const photo = process.argv[3]
  const photoTitle = process.argv[4]
  createPhotoPost(photosPath, spinner, photo, photoTitle)
} else {
  const title = process.argv[2]
  const newDate = process.argv[3]
  createArticlePost(postsPath, spinner, title, newDate)
}
