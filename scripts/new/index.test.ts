import { test, expect, describe, afterEach } from 'vitest'
import { createPhotoPost } from './createPhotoPost'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Ora } from 'ora'
import { createArticlePost } from './createArticlePost'

const destFolder = path.join('.', 'test/__fixtures__/tmp')

describe('npm run new', () => {
  afterEach(async () => {
    await fs.rm(destFolder, { recursive: true })
  })

  // Mock spinner
  const spinner = {
    text: '',
    succeed: (text: string) => {
      spinner.text = text
    },
    fail: (text: string) => {
      spinner.text = text
    }
  } as Ora

  test('createArticlePost should create a new article post', async () => {
    const fixturePath = path.join('.', 'test/__fixtures__/new-article.md')

    const title = 'Hello Test'
    const date = '2023-09-10'
    const file = await createArticlePost(destFolder, spinner, title, date)
    expect(file).toBeDefined()
    expect(spinner.text).toContain(`New post 'Hello Test' created.`)

    // Verify that the article post was created
    const fileExists =
      file &&
      (await fs
        .access(file)
        .then(() => true)
        .catch(() => false))

    expect(fileExists).toBe(true)

    // Compare the generated index.md with the fixture new-article.md
    const generatedContent = file && (await fs.readFile(file, 'utf8'))
    const fixtureContent = await fs.readFile(fixturePath, 'utf8')
    expect(generatedContent?.trim()).toBe(fixtureContent.trim())
  })

  test('createPhotoPost should create a new photo post', async () => {
    const photoPath = path.join(
      '.',
      'test/__fixtures__/image-with-metadata.jpg'
    )
    const fixturePath = path.join('.', 'test/__fixtures__/new-photo.md')

    const postPhotoFile = await createPhotoPost(destFolder, spinner, photoPath)
    expect(postPhotoFile).toBeDefined()

    // Verify that the photo post was created
    const fileExists =
      postPhotoFile &&
      (await fs
        .access(postPhotoFile)
        .then(() => true)
        .catch(() => false))

    expect(fileExists).toBe(true)
    expect(spinner.text).toContain(`New photo post`)

    // Compare the generated index.md with the fixture new-photo.md
    const generatedContent =
      postPhotoFile && (await fs.readFile(postPhotoFile, 'utf8'))
    const fixtureContent = await fs.readFile(fixturePath, 'utf8')
    expect(generatedContent?.trim()).toBe(fixtureContent.trim())
  })
})
