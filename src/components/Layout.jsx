import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Head from './molecules/Head'
import styles from './Layout.module.scss'

const Layout = ({ children, location }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          # the content/meta.yml file
          contentYaml {
            title
            tagline
            url
            author {
              name
              email
              uri
              twitter
              github
              facebook
              googleplus
              bitcoin
              ether
            }
          }
        }
      `}
      render={data => {
        const meta = data.contentYaml

        return (
          <Fragment>
            <Head meta={meta} />

            <main className={styles.screen} location={location}>
              {children}
            </main>
          </Fragment>
        )
      }}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired
}

export default Layout
