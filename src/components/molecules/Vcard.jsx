import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import IconLinks from './IconLinks'
import styles from './Vcard.module.scss'

const Vcard = () => (
  <StaticQuery
    query={graphql`
      query {
        contentYaml {
          author {
            name
            uri
            twitter
            github
            facebook
            avatar {
              childImageSharp {
                fixed(width: 80, height: 80) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const {
        twitter,
        github,
        facebook,
        avatar,
        name,
        uri
      } = data.contentYaml.author

      const links = [twitter, github, facebook]

      return (
        <div className="vcard author">
          <Img className={styles.avatar} fixed={avatar.childImageSharp.fixed} />
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
