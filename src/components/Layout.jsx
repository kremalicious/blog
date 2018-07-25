import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Container from './atoms/Container'
import Head from './molecules/Head'
import Header from './organisms/Header'
import styles from './Layout.module.scss'

const Layout = ({ children }) => {
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
            <Header />

            <main className={styles.site__document}>
              <div className={styles.site__content}>
                <Container>{children}</Container>
              </div>
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
