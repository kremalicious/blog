import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
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

const Changelog = ({ repo }) => (
  <StaticQuery
    query={queryGithub}
    render={data => {
      const repositoriesGitHub = data.github.viewer.repositories.edges

      let repoFilteredArray = repositoriesGitHub
        .map(({ node }) => {
          if (node.name === repo) return node
        })
        .filter(n => n)

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
    }}
  />
)

Changelog.propTypes = {
  repo: PropTypes.string.isRequired
}

export default Changelog
