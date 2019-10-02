import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import remark from 'remark'
import remarkReact from 'remark-react'
import styles from './Changelog.module.scss'

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

export default function Changelog({ repo }: { repo: string }) {
  const data = useStaticQuery(queryGithub)
  const repositoriesGitHub = data.github.viewer.repositories.edges

  const repoFilteredArray = repositoriesGitHub
    .map(({ node }: { node: any }) => {
      if (node.name === repo) return node
    })
    .filter((n: any) => n)

  const repoMatch = repoFilteredArray[0]
  const { object, url, owner } = repoMatch

  if (repoMatch === undefined || object === undefined) return null

  const changelogHtml =
    object &&
    remark()
      .use(remarkReact)
      .processSync(object.text).contents

  const filePathUrl = `${url}/tree/master/CHANGELOG.md`
  const filePathDisplay = `${owner.login}/${repo}:CHANGELOG.md`

  return (
    <div className={styles.changelog}>
      <h2 className={styles.changelogTitle} id="changelog">
        Changelog
      </h2>
      <div className={styles.changelogContent}>
        {changelogHtml}
        <p className={styles.changelogSource}>
          <em>
            sourced from{' '}
            <a href={filePathUrl}>
              <code>{filePathDisplay}</code>
            </a>
          </em>
        </p>
      </div>
    </div>
  )
}
