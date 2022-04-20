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
import { content, source } from './Changelog.module.css'
import { GitHub, GitHubRepo } from '../../@types/GitHub'

export function PureChangelog({
  repo,
  repos
}: {
  repo: string
  repos: [{ node: GitHubRepo }]
}): ReactElement {
  const [changelogHtml, setChangelogHtml] = useState()

  const repoFilteredArray = repos
    .map(({ node }: { node: GitHubRepo }) => {
      if (node.name === repo) return node
    })
    .filter((n: any) => n)

  const repoMatch = repoFilteredArray[0]

  useEffect(() => {
    if (!repoMatch?.object?.text) return

    async function init() {
      const changelogHtml = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeReact, { createElement, Fragment })
        .processSync(repoMatch.object.text).result

      setChangelogHtml(changelogHtml)
    }
    init()
  }, [repoMatch?.object?.text])

  return repoMatch ? (
    <div className={content} id="changelog">
      {changelogHtml}
      <p className={source}>
        sourced from{' '}
        <a href={`${repoMatch?.url}/tree/main/CHANGELOG.md`}>
          <code>{`${repoMatch?.owner.login}/${repo}:CHANGELOG.md`}</code>
        </a>
      </p>
    </div>
  ) : null
}

const queryGithub = graphql`
  query GitHubReposInfo {
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
  const data: GitHub = useStaticQuery(queryGithub)
  const repos: [{ node: GitHubRepo }] = data.github.viewer.repositories.edges
  return <PureChangelog repo={repo} repos={repos} />
}
