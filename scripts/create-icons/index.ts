//
// Generate Astro components from SVG files.
// adapted from https://github.com/astro-community/icons
//
import fs from 'node:fs/promises'
import ps from 'node:path/posix'
import chalk from 'chalk'
import ora from 'ora'
import { toInnerSvg } from './svg.ts'
import { toAstroComponent } from './toAstroComponent.ts'
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
    `${chalk.bold('[create-icons]')} Create icon components`
  ).start()

  const dist = _distDir || distDir

  // clean the distribution directory
  await fs.rm(dist, { force: true, recursive: true })
  await fs.mkdir(dist, { recursive: true })
  await fs.mkdir(`${dist}/react`, { recursive: true })

  // copy the attribute typings file
  await fs.copyFile(
    ps.resolve(currentDir, 'scripts/create-icons/Props.d.ts'),
    ps.resolve(dist, 'Props.d.ts')
  )
  await fs.copyFile(
    ps.resolve(currentDir, 'scripts/create-icons/Props.d.ts'),
    ps.resolve(`${dist}/react`, 'Props.d.ts')
  )

  // convert the SVG files into Astro & React components
  let contentOfIndexJs = '// @ts-nocheck\n'
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

      // write the astro component to a file
      await fs.writeFile(
        ps.resolve(dist, `${baseName}.astro`),
        toAstroComponent(innerSvg, title),
        'utf8'
      )

      // write the react component to a file
      await fs.writeFile(
        ps.resolve(`${dist}/react`, `${baseName}.tsx`),
        toReactComponent(innerSvg, title),
        'utf8'
      )

      // add the astro component export to the main entry `index.ts` file
      contentOfIndexJs += `\nexport { default as ${baseName} } from './${baseName}.astro'`

      // add the react component export to the main entry `react/index.ts` file
      contentOfIndexReactJs += `\nexport { Icon as ${baseName} }  from './${baseName}.tsx'`

      icons.push({ name, baseName, title })
    }
  }

  // write the main Astro entry `index.ts` file
  await fs.writeFile(ps.resolve(dist, 'index.ts'), contentOfIndexJs, 'utf8')

  // write the main React entry `react/index.ts` file
  await fs.writeFile(
    ps.resolve(`${dist}/react`, 'index.ts'),
    contentOfIndexReactJs,
    'utf8'
  )

  spinner.succeed(
    `${chalk.bold('[create-icons]')} Generated ${
      icons.length
    } icons into @/images/components.`
  )
}

generateIcons(distDir)
