import React from 'react'
import ReactDOM from 'react-dom'
import { graphql, useStaticQuery } from 'gatsby'
import Container from '../atoms/Container'
import PostTeaser from '../Post/PostTeaser'
import SearchResultsEmpty from './SearchResultsEmpty'
import styles from './SearchResults.module.scss'
import { GatsbyImageProps } from 'gatsby-image'

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

interface Page {
  slug: string
}

interface PostNode {
  node: {
    id: string
    fields: { slug: string }
    frontmatter: {
      title: string
      type: string
      image: { childImageSharp: GatsbyImageProps }
    }
  }
}

export default function SearchResults({
  searchQuery,
  results,
  toggleSearch
}: {
  searchQuery: string
  results: any
  toggleSearch(): void
}) {
  const data = useStaticQuery(query)
  const posts = data.allMarkdownRemark.edges

  // creating portal to break out of DOM node we're in
  // and render the results in content container
  return ReactDOM.createPortal(
    <div className={styles.searchResults}>
      <Container>
        {results.length > 0 ? (
          <ul>
            {results.map((page: Page) =>
              posts
                .filter((post: PostNode) => post.node.fields.slug === page.slug)
                .map((post: PostNode) => (
                  <PostTeaser
                    key={page.slug}
                    post={post.node}
                    toggleSearch={toggleSearch}
                  />
                ))
            )}
          </ul>
        ) : (
          <SearchResultsEmpty searchQuery={searchQuery} results={results} />
        )}
      </Container>
    </div>,
    document.getElementById('document')
  )
}
