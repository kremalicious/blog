//
// Generate React components from SVG files.
// adapted from https://github.com/astro-community/icons
//
import fs from 'node:fs/promises'
import ps from 'node:path/posix'
import chalk from 'chalk'
import ora from 'ora'
import { toInnerSvg } from './svg.ts'
import { toReactComponent } from './toReactComponent.ts'

// Current directory.
const currentDir = ps.resolve('.')

// // Source directories
const srcDirs = [
  ps.resolve(currentDir, 'node_modules/feather-icons/dist/icons'),
  ps.resolve(currentDir, 'src/images')
]

// Distribution directory.
const distDir = ps.resolve(currentDir, 'src/images/components')

// Data related to each icon exported by this package.
const icons = []

export async function generateIcons(_distDir: string) {
  const spinner = ora(
    `${chalk.bold('[create-icons]')} Create React icon components`
  ).start()

  const dist = _distDir || distDir
  const reactDist = `${dist}/react`

  // clean the distribution directory
  await fs.rm(dist, { force: true, recursive: true })
  await fs.mkdir(dist, { recursive: true })
  await fs.mkdir(reactDist, { recursive: true })

  // copy the attribute typings file
  await fs.copyFile(
    ps.resolve(currentDir, 'scripts/create-icons/Props.d.ts'),
    ps.resolve(dist, 'Props.d.ts')
  )
  await fs.copyFile(
    ps.resolve(currentDir, 'scripts/create-icons/Props.d.ts'),
    ps.resolve(reactDist, 'Props.d.ts')
  )

  // convert the SVG files into React components
  let contentOfIndexReactJs = '// @ts-nocheck\n'

  for (const src of srcDirs) {
    for (let filepath of await fs.readdir(src, { encoding: 'utf8' })) {
      // ignore non-svg files
      if (!filepath.endsWith('.svg')) continue

      // Base name of the SVG.
      const name = filepath.replace(/\.svg$/, '')

      // get filepath as a full path
      filepath = ps.resolve(src, filepath)

      // Inner contents of the SVG file.
      const innerSvg = toInnerSvg(await fs.readFile(filepath, 'utf8'))

      // Formatted title.
      const title = name
        .replace(
          // uppercase alphabetic characters after the start or a dash
          /(?<=^|-)([a-z])/g,
          (_0, $1) => $1.toUpperCase()
        )
        .replace(
          // replace non-alphanumeric characters with space
          /[^A-Za-z0-9]+/g,
          ' '
        )
        .replace(
          // respect 'GitHub' brand casing
          'Github Logo',
          'GitHub Logo'
        )

      // Base name, which is the formatted title without spaces (PascalCase)
      const baseName = title.replace(/ /g, '')

      // write the react component to a file
      await fs.writeFile(
        ps.resolve(reactDist, `${baseName}.tsx`),
        toReactComponent(innerSvg, title),
        'utf8'
      )

      // add the react component export to the main entry `react/index.ts` file
      contentOfIndexReactJs += `\nexport { Icon as ${baseName} }  from './${baseName}.tsx'`

      icons.push({ name, baseName, title })
    }
  }

  // write the main React entry `react/index.ts` file
  await fs.writeFile(
    ps.resolve(reactDist, 'index.ts'),
    contentOfIndexReactJs,
    'utf8'
  )

  // Create a simple index.ts in the root directory that re-exports from react
  const rootIndexContent =
    "// Re-export React components\nexport * from './react'\n"
  await fs.writeFile(ps.resolve(dist, 'index.ts'), rootIndexContent, 'utf8')

  spinner.succeed(
    `${chalk.bold('[create-icons]')} Generated ${
      icons.length
    } React icon components into @/images/components.`
  )
}

generateIcons(distDir)
