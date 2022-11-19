import React, {
  ReactElement,
  useEffect,
  useState,
  createElement,
  Fragment
} from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeReact from 'rehype-react'
import * as styles from './Changelog.module.css'

export function PureChangelog({
  repo,
  repos
}: {
  repo: string
  repos: Queries.GitHubReposQuery['github']['viewer']['repositories']['edges']
}): ReactElement | null {
  const [changelogHtml, setChangelogHtml] = useState()

  const repoMatch = repos
    .map(({ node }) => {
      if (node.name === repo) return node
    })
    .filter((n: any) => n)[0]

  useEffect(() => {
    if (!(repoMatch?.object as Queries.GitHub_Blob)?.text) return

    async function init() {
      const changelogHtml = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeReact, { createElement, Fragment })
        .processSync((repoMatch?.object as Queries.GitHub_Blob).text).result

      setChangelogHtml(changelogHtml)
    }
    init()
  }, [(repoMatch?.object as Queries.GitHub_Blob)?.text])

  return repoMatch ? (
    <div className={styles.content} id="changelog">
      {changelogHtml}
      <p className={styles.source}>
        sourced from{' '}
        <a href={`${repoMatch?.url}/tree/main/CHANGELOG.md`}>
          <code>{`${repoMatch?.owner.login}/${repo}:CHANGELOG.md`}</code>
        </a>
      </p>
    </div>
  ) : null
}

const queryGithub = graphql`
  query GitHubRepos {
    github {
      viewer {
        repositories(first: 100, privacy: PUBLIC, isFork: false) {
          edges {
            node {
              name
              url
              owner {
                login
              }
              object(expression: "main:CHANGELOG.md") {
                id
                ... on GitHub_Blob {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`

export default function Changelog({ repo }: { repo: string }): ReactElement {
  const data = useStaticQuery<Queries.GitHubReposQuery>(queryGithub)
  const repos = data.github.viewer.repositories.edges
  return <PureChangelog repo={repo} repos={repos} />
}
