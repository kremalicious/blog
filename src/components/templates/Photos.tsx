import React, { ReactElement } from 'react'
import { graphql, Link } from 'gatsby'
import Page from './Page'
import { Post, PageContext } from '../../@types/Post'
import { Image } from '../atoms/Image'
import styles from './Photos.module.scss'
import Pagination from '../molecules/Pagination'

export const PhotoThumb = ({ photo }: { photo: Post }): ReactElement => {
  const { title, image } = photo.frontmatter
  const { slug } = photo.fields
  const { fluid } = image.childImageSharp

  return (
    <article className={styles.photo}>
      {image && (
        <Link to={slug}>
          <Image title={title} fluid={fluid} alt={title} />
        </Link>
      )}
    </article>
  )
}

export default function Photos({
  data,
  pageContext
}: {
  data: any
  pageContext: PageContext
}): ReactElement {
  const photos = data.allMarkdownRemark.edges
  const { currentPageNumber, numPages } = pageContext

  const paginationTitle =
    numPages > 1 && currentPageNumber > 1
      ? `Page ${currentPageNumber} / ${numPages}`
      : ''

  const page = {
    frontmatter: {
      title: `Photos ${paginationTitle}`,
      description:
        'Personal photos of designer & developer Matthias Kretschmann.'
    }
  }

  return (
    <Page title={page.frontmatter.title} post={page}>
      <section className={styles.photos}>
        {photos.map(({ node }: { node: Post }) => (
          <PhotoThumb key={node.id} photo={node} />
        ))}
      </section>

      {numPages > 1 && <Pagination pageContext={pageContext} />}
    </Page>
  )
}

export const photosQuery = graphql`
  query($skip: Int, $limit: Int) {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "photo" } } }
      sort: { order: DESC, fields: [fields___date] }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                ...PhotoFluidThumb
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
