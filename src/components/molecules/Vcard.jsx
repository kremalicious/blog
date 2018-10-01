import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
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
        }
      }
    }

    avatar: allFile(filter: { name: { eq: "avatar" } }) {
      edges {
        node {
          childImageSharp {
            fixed(width: 80, height: 80, quality: 90) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
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
        name,
        uri
      } = data.site.siteMetadata.author

      const avatar = data.avatar.edges[0].node.childImageSharp.fixed
      const links = [twitter, github, facebook]

      return (
        <div className="vcard author">
          <Img
            className={styles.avatar}
            fixed={avatar}
            alt="avatar"
            width="80"
            height="80"
          />
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
