import path from 'node:path'
import ora from 'ora'
import { createArticlePost } from './createArticlePost.js'
import { createPhotoPost } from './createPhotoPost.js'

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
  // Get all arguments after 'photo'
  const photos: string[] = []
  let photoTitle: string | undefined

  // Process all arguments, looking for file paths
  for (let i = 3; i < process.argv.length; i++) {
    const arg = process.argv[i]
    // If argument starts with a quote, consider it a title rather than a file path
    if (arg.startsWith('"') || arg.startsWith("'")) {
      photoTitle = arg.replace(/^["']|["']$/g, '') // Remove quotes
    } else {
      photos.push(arg)
    }
  }

  if (photos.length === 0) {
    spinner.fail(
      'No photo paths provided. Use the format `npm run new photo path/to/photo.jpg`'
    )
  } else {
    spinner.text = `Processing ${photos.length} photo${photos.length > 1 ? 's' : ''}...`
    createPhotoPost(photosPath, spinner, photos, photoTitle)
  }
} else {
  const title = process.argv[2]
  const newDate = process.argv[3]
  createArticlePost(postsPath, spinner, title, newDate)
}
