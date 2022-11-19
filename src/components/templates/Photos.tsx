import React, { ReactElement } from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import { PageContext } from '../../@types/Post'
import { Image } from '../atoms/Image'
import Pagination from '../molecules/Pagination'
import Page from './Page'
import * as styles from './Photos.module.css'
import HeadMeta, { HeadMetaProps } from '../atoms/HeadMeta'

export const PhotoThumb = ({
  photo
}: {
  photo: Queries.PhotosTemplateQuery['allMarkdownRemark']['edges'][0]['node']
}): ReactElement => {
  const { title, image } = photo.frontmatter
  const { slug } = photo.fields
  const { gatsbyImageData } = (image as any).childImageSharp

  return (
    <article className={styles.photo}>
      {image && (
        <Link to={slug}>
          <Image title={title} image={gatsbyImageData} alt={title} />
        </Link>
      )}
    </article>
  )
}

interface PhotosPageProps extends PageProps {
  data: Queries.PhotosTemplateQuery
  pageContext: PageContext
}

function getMetadata(currentPageNumber: number, numPages: number) {
  const paginationTitle =
    numPages > 1 && currentPageNumber > 1
      ? `Page ${currentPageNumber} / ${numPages}`
      : ''

  const meta: Partial<HeadMetaProps> = {
    title: `Photos ${paginationTitle}`,
    description: 'Personal photos of designer & developer Matthias Kretschmann.'
  }

  return meta
}

export default function Photos({
  data,
  pageContext
}: PhotosPageProps): ReactElement {
  const photos = data.allMarkdownRemark.edges
  const { currentPageNumber, numPages } = pageContext
  const meta = getMetadata(currentPageNumber, numPages)

  return (
    <Page title={meta.title}>
      <section className={styles.photos}>
        {photos.map(({ node }) => (
          <PhotoThumb key={node.id} photo={node} />
        ))}
      </section>

      {numPages > 1 && <Pagination pageContext={pageContext} />}
    </Page>
  )
}

export function Head({
  pageContext
}: {
  pageContext: PhotosPageProps['pageContext']
}) {
  const { currentPageNumber, numPages } = pageContext
  const meta = getMetadata(currentPageNumber, numPages)
  return <HeadMeta {...meta} slug={pageContext.slug} />
}

export const photosQuery = graphql`
  query PhotosTemplate($skip: Int, $limit: Int) {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "photo" } } }
      sort: { fields: { date: DESC } }
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
            type
          }
        }
      }
    }
  }
`
