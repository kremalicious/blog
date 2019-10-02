import { useStaticQuery, graphql } from 'gatsby'

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

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(query)
  return site.siteMetadata
}
