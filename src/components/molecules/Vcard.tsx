import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import IconLinks from './Networks'
import { avatar as styleAvatar, description } from './Vcard.module.css'
import { useSiteMetadata } from '../../hooks/use-site-metadata'

const query = graphql`
  query {
    avatar: allFile(filter: { name: { eq: "avatar" } }) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              width: 80
              height: 80
              quality: 85
            )
          }
        }
      }
    }
  }
`

export default function Vcard(): ReactElement {
  const data = useStaticQuery(query)
  const { author, rss, jsonfeed } = useSiteMetadata()
  const { twitter, github, name, uri } = author
  const avatar = getSrc(data.avatar.edges[0].node)
  const links = [twitter, github, rss, jsonfeed]

  return (
    <>
      <img
        className={styleAvatar}
        src={avatar}
        width="80"
        height="80"
        alt="avatar"
      />
      <p className={description}>
        Blog of designer &amp; developer{' '}
        <a className="fn" rel="author" href={uri}>
          {name}
        </a>
      </p>

      <IconLinks links={links} />
    </>
  )
}
