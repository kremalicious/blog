//
// Find all zip files in all article folders
// and copy them to public/get/ folder.
//
import fs from 'node:fs'
import path from 'node:path'
import { glob } from 'glob'
import ora from 'ora'

const sourceFolder = './content/articles/'
const destinationFolder = './public/get/'
const filesGlob = '**/*.zip'

const spinner = ora('Move downloads').start()

function removeFolderContents(folderPath: string) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const filePath = path.join(folderPath, file)
      if (fs.lstatSync(filePath).isDirectory()) {
        removeFolderContents(filePath)
        fs.rmdirSync(filePath)
      } else {
        fs.unlinkSync(filePath)
      }
    })
  }
}

function copyZipFiles(source: string, destination: string) {
  // Clean out the destination folder
  removeFolderContents(destination)

  // Create the destination folder if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true })
  }

  // Find all files recursively in the source folder
  const zipFiles = glob.sync(filesGlob, { cwd: source })

  zipFiles.forEach((zipFile: string) => {
    const sourcePath = path.join(source, zipFile)
    const destinationPath = path.join(destination, path.basename(zipFile))

    try {
      // Copy the file to the destination folder
      fs.copyFileSync(sourcePath, destinationPath)
    } catch (error: any) {
      spinner.fail(`Error copying ${zipFile}: ${(error as Error).message}`)
      return
    }
  })

  spinner.succeed(`Copied ${zipFiles.length} .zip files to ${destination}`)
}

copyZipFiles(sourceFolder, destinationFolder)
