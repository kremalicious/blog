import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Container from '../atoms/Container'
import PostTeaser from '../Post/PostTeaser'
import SearchResultsEmpty from './SearchResultsEmpty'
import styles from './SearchResults.module.scss'

const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                ...ImageFluidThumb
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default class SearchResults extends PureComponent {
  static propTypes = {
    results: PropTypes.array.isRequired,
    searchQuery: PropTypes.string.isRequired,
    toggleSearch: PropTypes.func.isRequired
  }

  render() {
    const { searchQuery, results, toggleSearch } = this.props

    return (
      <StaticQuery
        query={query}
        render={data => {
          const posts = data.allMarkdownRemark.edges

          // creating portal to break out of DOM node we're in
          // and render the results in content container
          return ReactDOM.createPortal(
            <div className={styles.searchResults}>
              <Container>
                {results.length > 0 ? (
                  <ul>
                    {results.map(page =>
                      posts
                        .filter(post => post.node.fields.slug === page.slug)
                        .map(({ node }) => (
                          <PostTeaser
                            key={page.slug}
                            post={node}
                            toggleSearch={toggleSearch}
                          />
                        ))
                    )}
                  </ul>
                ) : (
                  <SearchResultsEmpty
                    searchQuery={searchQuery}
                    results={results}
                  />
                )}
              </Container>
            </div>,
            document.getElementById('document')
          )
        }}
      />
    )
  }
}
