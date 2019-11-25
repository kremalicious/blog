import React from 'react'

export default function schemaOrg(
  blogURL: string,
  title: string,
  postSEO: boolean,
  postURL: string,
  image: string,
  description: string,
  author?: string
) {
  const schemaOrgJSONLD: any = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: blogURL,
      name: title
    }
  ]

  if (postSEO) {
    schemaOrgJSONLD.push({
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      author,
      publisher: author,
      url: postURL,
      name: title,
      headline: title,
      image: {
        '@type': 'ImageObject',
        url: image
      },
      description
    })
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaOrgJSONLD)}
    </script>
  )
}
