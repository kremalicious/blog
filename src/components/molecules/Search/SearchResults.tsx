import React from 'react'
import ReactDOM from 'react-dom'
import { graphql, useStaticQuery } from 'gatsby'
import Container from '../../atoms/Container'
import PostTeaser from '../../../templates/Post/PostTeaser'
import SearchResultsEmpty from './SearchResultsEmpty'
import styles from './SearchResults.module.scss'
import { Post } from '../../../@types/Post'

export interface Results {
  slug: string
}

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

function SearchResultsPure({
  searchQuery,
  results,
  toggleSearch,
  posts
}: {
  posts: [{ node: Post }]
  searchQuery: string
  results: Results[]
  toggleSearch(): void
}) {
  return (
    <div className={styles.searchResults}>
      <Container>
        {results.length > 0 ? (
          <ul>
            {results.map((page: { slug: string }) =>
              posts
                .filter(
                  ({ node }: { node: Post }) => node.fields.slug === page.slug
                )
                .map(({ node }: { node: Post }) => (
                  <PostTeaser
                    key={page.slug}
                    post={node}
                    toggleSearch={toggleSearch}
                  />
                ))
            )}
          </ul>
        ) : (
          <SearchResultsEmpty searchQuery={searchQuery} results={results} />
        )}
      </Container>
    </div>
  )
}

export default function SearchResults({
  searchQuery,
  results,
  toggleSearch
}: {
  searchQuery: string
  results: Results[]
  toggleSearch(): void
}) {
  const data = useStaticQuery(query)
  const posts = data.allMarkdownRemark.edges

  // creating portal to break out of DOM node we're in
  // and render the results in content container
  return ReactDOM.createPortal(
    <SearchResultsPure
      posts={posts}
      results={results}
      searchQuery={searchQuery}
      toggleSearch={toggleSearch}
    />,
    document.getElementById('document')
  )
}
