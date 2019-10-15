import { useStaticQuery, graphql } from 'gatsby'
import { SiteMetadata } from '../@types/SiteMetadata'

export function useSiteMetadata(): SiteMetadata {
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
          typekitID
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

  const { site } = useStaticQuery(query)
  return site.siteMetadata
}
