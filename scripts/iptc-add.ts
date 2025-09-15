#!/usr/bin/env node

// Recursively add IPTC metadata to all image files in the specified directory.
//
// Usage:
//
// ```bash
// ./scripts/iptc-add.ts <path-to-directory>
// ```

import { resolve } from 'node:path'
import { exiftool, type WriteTags } from 'exiftool-vendored'
import { globby } from 'globby'
import { oraPromise } from 'ora'
import { metadata } from '@/config'

const IPTC_METADATA: WriteTags = {
  Copyright: metadata.photos.copyrightNotice,
  CopyrightNotice: metadata.photos.copyrightNotice,
  Creator: metadata.author.name,
  'By-line': metadata.author.name,
  Contact: metadata.author.email
}

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.tiff', '.tif', '.png']

async function main() {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.error('Please provide a directory path as an argument')
    process.exit(1)
  }

  const directory = resolve(args[0])
  console.log(`Processing directory: ${directory}`)

  try {
    // Find all image files recursively
    const files = await globby(
      `${directory}/**/*{${SUPPORTED_EXTENSIONS.join(',')}}`,
      { absolute: true, onlyFiles: true }
    )

    if (files.length === 0) {
      console.log('No image files found in the specified directory')
      process.exit(0)
    }

    console.log(`Found ${files.length} image files to process`)

    // Process each file
    for (const file of files) {
      await oraPromise(
        exiftool.write(file, IPTC_METADATA, {
          writeArgs: ['-overwrite_original_in_place']
        }),
        {
          text: `Processing ${file}`,
          successText: `Processed ${file}`,
          failText: `Failed to process ${file}`
        }
      )

      // verify that the metadata was added
      const metadata = await exiftool.read(file)
      if (
        metadata.CopyrightNotice !== IPTC_METADATA.CopyrightNotice ||
        metadata['By-line'] !== IPTC_METADATA['By-line'] ||
        metadata.Contact !== IPTC_METADATA.Contact
      ) {
        console.error(`Failed to add metadata to ${file}`)
        process.exit(1)
      }
    }

    console.log('All files processed successfully')
  } catch (error) {
    console.error('Error processing files:', error)
    process.exit(1)
  } finally {
    await exiftool.end()
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error)
  process.exit(1)
})
