import React, { ReactElement } from 'react'
import { ImageDataLike } from 'gatsby-plugin-image'
import { useSiteMetadata } from '../../../hooks/useSiteMetadata'

type SchemaOrgProps = {
  post?: {
    title: string
    url: string
    image: ImageDataLike
    description: string
    datePublished: string
    dateModified: string
  }
}

export default function SchemaOrg({ post }: SchemaOrgProps): ReactElement {
  const { siteTitle, siteUrl, author } = useSiteMetadata()

  const schemaOrgJsonLd: any = [
    {
      '@context': 'http://schema.org',
      '@type': 'Blog',
      url: siteUrl,
      name: siteTitle
    }
  ]

  if (post) {
    schemaOrgJsonLd.push({
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      author: {
        '@type': 'Person',
        name: author.name
      },
      publisher: {
        '@type': 'Organization',
        name: author.name
      },
      url: post.url,
      name: post.title,
      headline: post.title,
      image: {
        '@type': 'ImageObject',
        url: post.image
      },
      description: post.description,
      datePublished: post.datePublished,
      dateModified: post.dateModified || post.datePublished,
      mainEntityOfPage: {
        '@type': 'Blog',
        '@id': siteUrl
      }
    })
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaOrgJsonLd)}
    </script>
  )
}
