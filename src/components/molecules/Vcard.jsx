import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import Img from 'gatsby-image'
import IconLinks from './IconLinks'
import styles from './Vcard.module.scss'

const query = graphql`
  query {
    site {
      siteMetadata {
        author {
          name
          uri
          twitter
          github
          facebook
          avatar
        }
      }
    }
  }
`

const Vcard = () => (
  <StaticQuery
    query={query}
    render={data => {
      const {
        twitter,
        github,
        facebook,
        avatar,
        name,
        uri
      } = data.site.siteMetadata.author

      const links = [twitter, github, facebook]

      return (
        <div className="vcard author">
          <img className={styles.avatar} src={avatar} alt="avatar" />
          <p className={styles.description}>
            Blog of designer &amp; developer{' '}
            <a className="fn" rel="author" href={uri}>
              {name}
            </a>
          </p>

          <IconLinks links={links} />
        </div>
      )
    }}
  />
)

export default Vcard
