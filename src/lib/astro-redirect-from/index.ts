import fs from 'node:fs/promises'
import path from 'node:path'
import fg from 'fast-glob'
import matter from 'gray-matter'
import type { AstroIntegration, AstroIntegrationLogger } from 'astro'
import { getSlugFromFilePath, writeJson } from './utils'

type PluginOptions = {
  contentDir?: string
  getSlug?: (filePath: string) => string
}

export default function astroRedirectFrom({
  contentDir = 'src/',
  getSlug = getSlugFromFilePath
}: PluginOptions = {}): AstroIntegration {
  const sourceDir = path.join(process.cwd(), contentDir)

  return {
    name: 'redirect-from',
    hooks: {
      'astro:config:setup': async ({
        updateConfig,
        logger
      }: {
        updateConfig: (newConfig: Record<string, any>) => void
        logger: AstroIntegrationLogger
      }) => {
        const redirects: { [old: string]: string } = {}

        try {
          const markdownFiles = await fg.glob('./**/*.{md,mdx}', {
            cwd: sourceDir
          })
          if (!markdownFiles?.length) {
            logger.warn('No markdown files found')
            return
          }

          for (const markdownFile of markdownFiles) {
            const fileContent = await fs.readFile(
              path.join(sourceDir, markdownFile),
              'utf-8'
            )

            const { data: frontmatter } = matter(fileContent)
            const postRedirectFrom: string[] = frontmatter?.redirect_from
            if (
              !frontmatter ||
              !postRedirectFrom ||
              // filter out drafts in production
              (import.meta.env.PROD && frontmatter.draft === true)
            )
              continue

            let postSlug = frontmatter.slug
            if (!postSlug) postSlug = getSlug(markdownFile)
            logger.info(postSlug)
            if (!postSlug) continue

            for (const slug of postRedirectFrom) {
              redirects[slug] = postSlug
            }
          }

          updateConfig({ redirects })

          await writeJson(
            path.join(process.cwd(), '.astro', 'redirects.json'),
            redirects
          )

          logger.info(
            `Added ${Object.keys(redirects).length} redirects to Astro config`
          )
        } catch (error: any) {
          logger.error((error as Error).message)
        }
      }
    }
  }
}
