import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import remark from 'remark'
import remarkReact from 'remark-react'
import styles from './Changelog.module.scss'
import { GitHub, GitHubRepo } from '../../@types/GitHub'

export function PureChangelog({
  repo,
  repos
}: {
  repo: string
  repos: [{ node: GitHubRepo }]
}): ReactElement {
  const repoFilteredArray = repos
    .map(({ node }: { node: GitHubRepo }) => {
      if (node.name === repo) return node
    })
    .filter((n: any) => n)

  const repoMatch = repoFilteredArray[0]
  if (!repoMatch) return null

  const { object, url, owner } = repoMatch

  const changelogHtml =
    object && remark().use(remarkReact).processSync(object.text).result

  const filePathUrl = `${url}/tree/master/CHANGELOG.md`
  const filePathDisplay = `${owner.login}/${repo}:CHANGELOG.md`

  return (
    <div className={styles.changelog}>
      <h2 className={styles.title} id="changelog">
        Changelog
      </h2>
      <div className={styles.content}>
        <p className={styles.source}>
          <em>
            sourced from{' '}
            <a href={filePathUrl}>
              <code>{filePathDisplay}</code>
            </a>
          </em>
        </p>
        {changelogHtml}
      </div>
    </div>
  )
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
              object(expression: "master:CHANGELOG.md") {
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
