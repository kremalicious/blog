import * as dotenv from 'dotenv'

dotenv.config()

const myQuery = `
{
    posts: allMarkdownRemark {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            image {
              fields {
                exif {
                  formatted {
                    iso
                    model
                    fstop
                    shutterspeed
                    focalLength
                    lensModel
                    exposure
                    gps {
                      latitude
                      longitude
                    }
                  }
                }
              }
            }
            toc
            author
            updated
            tags
            linkurl
            style {
              publicURL
            }
            changelog
          }
          fields {
            type
            slug
            date
            githubLink
          }
          rawMarkdownBody
        }
      }
    }
  }
`

const queries = [
  {
    query: myQuery,
    // queryVariables: {}, // optional. Allows you to use graphql query variables in the query
    transformer: ({ data }) => data.posts.edges.map(({ node }) => node), // optional
    // indexName: 'index name to target', // overrides main index name, optional
    settings: {
      // optional, any index settings
      // Note: by supplying settings, you will overwrite all existing settings on the index
    },
    mergeSettings: false // optional, defaults to false. See notes on mergeSettings below
  }
]

export default {
  // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
  resolve: `gatsby-plugin-algolia`,
  options: {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_API_KEY,
    indexName: process.env.ALGOLIA_INDEX_NAME,
    queries,
    chunkSize: 10000, // default: 1000
    settings: {
      // optional, any index settings
      // Note: by supplying settings, you will overwrite all existing settings on the index
    },
    mergeSettings: false, // optional, defaults to false. See notes on mergeSettings below
    concurrentQueries: false, // default: true
    dryRun: false, // default: false, only calculate which objects would be indexed, but do not push to Algolia
    continueOnFailure: false, // default: false, don't fail the build if Algolia indexing fails
    algoliasearchOptions: undefined // default: { timeouts: { connect: 1, read: 30, write: 30 } }, pass any different options to the algoliasearch constructor
  }
}
