import React, { ReactElement } from 'react'

export default function schemaOrg(
  blogURL: string,
  title: string,
  postSEO: boolean,
  postURL: string,
  image: string,
  description: string,
  author: string,
  datePublished: string,
  dateModified: string
): ReactElement {
  const schemaOrgJSONLD: any = [
    {
      '@context': 'http://schema.org',
      '@type': 'Blog',
      url: blogURL,
      name: title
    }
  ]

  if (postSEO) {
    schemaOrgJSONLD.push({
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      author: {
        '@type': 'Person',
        name: author
      },
      publisher: {
        '@type': 'Organization',
        name: author
      },
      url: postURL,
      name: title,
      headline: title,
      image: {
        '@type': 'ImageObject',
        url: image
      },
      description,
      datePublished,
      dateModified: dateModified || datePublished,
      mainEntityOfPage: {
        '@type': 'Blog',
        '@id': blogURL
      }
    })
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaOrgJSONLD)}
    </script>
  )
}
