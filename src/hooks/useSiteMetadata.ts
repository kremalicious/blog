import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query SiteMetadata {
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
          mastodon
          github
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

export function useSiteMetadata() {
  const { site } = useStaticQuery<Queries.SiteMetadataQuery>(query)
  return site.siteMetadata
}
