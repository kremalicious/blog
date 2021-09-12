import { useStaticQuery, graphql } from 'gatsby'
import { Site } from '../@types/Site'

const query = graphql`
  query {
    site {
      siteMetadata {
        siteTitle
        siteTitleShort
        siteDescription
        siteUrl
        author {
          name
          email
          uri
          twitter
          github
          facebook
          bitcoin
          ether
        }
        menu {
          title
          link
        }
        rss
        jsonfeed
        itemsPerPage
        repoContentPath
      }
    }
  }
`

export function useSiteMetadata(): Site {
  const { site } = useStaticQuery(query)
  return site.siteMetadata
}
