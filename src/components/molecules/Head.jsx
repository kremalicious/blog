import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Typekit from '../atoms/Typekit'

const query = graphql`
  query {
    contentYaml {
      title
      tagline
    }
  }
`

const Head = () => (
  <StaticQuery
    query={query}
    render={data => {
      const { title, tagline } = data.contentYaml

      return (
        <Fragment>
          <Helmet
            defaultTitle={`${title.toLowerCase()} ¦ ${tagline.toLowerCase()}`}
            titleTemplate={`%s ¦ ${title.toLowerCase()}`}
          >
            <meta
              name="apple-mobile-web-app-title"
              content={title.toLowerCase()}
            />
            <meta name="theme-color" content="#e7eef4" />
          </Helmet>

          <Typekit />
        </Fragment>
      )
    }}
  />
)

export default Head