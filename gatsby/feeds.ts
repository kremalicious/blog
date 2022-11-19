import fs from 'fs'
import path from 'path'
import config from '../config'

const feedContent = (
  edge: Queries.AllContentFeedQuery['allMarkdownRemark']['edges'][0]
) => {
  const { html, frontmatter } = edge.node
  const footer =
    '<hr />This post was published on <a href="https://kremalicious.com">kremalicious.com</a>'

  return frontmatter?.image
    ? `<img src="${frontmatter?.image?.childImageSharp?.resize?.src}" /><br />${html}${footer}`
    : `${html}${footer}`
}

async function jsonItems(
  posts: Queries.AllContentFeedQuery['allMarkdownRemark']['edges']
) {
  return posts.map((edge) => {
    const { frontmatter, fields, excerpt } = edge.node
    if (!fields?.slug || !fields?.date) return

    return {
      id: path.join(config.siteUrl, fields.slug),
      url: path.join(config.siteUrl, fields.slug),
      title: frontmatter?.title,
      summary: excerpt,
      date_published: new Date(fields.date).toISOString(),
      date_modified: frontmatter?.updated
        ? new Date(frontmatter?.updated).toISOString()
        : new Date(fields.date).toISOString(),
      tags: [frontmatter?.tags],
      content_html: feedContent(edge)
    }
  })
}

const createJsonFeed = async (
  posts: Queries.AllContentFeedQuery['allMarkdownRemark']['edges']
) => ({
  version: 'https://jsonfeed.org/version/1',
  title: config.siteTitle,
  description: config.siteDescription,
  home_page_url: config.siteUrl,
  feed_url: path.join(config.siteUrl, 'feed.json'),
  user_comment:
    'This feed allows you to read the posts from this site in any feed reader that supports the JSON Feed format. To add this feed to your reader, copy the following URL — https://kremalicious.com/feed.json — and add it your reader.',
  favicon: path.join(config.siteUrl, 'favicon.ico'),
  icon: path.join(config.siteUrl, 'apple-touch-icon.png'),
  author: {
    name: config.author.name,
    url: config.author.uri
  },
  items: await jsonItems(posts)
})

const generateJsonFeed = async (
  posts: Queries.AllContentFeedQuery['allMarkdownRemark']['edges'] | undefined
) => {
  if (!posts) return

  try {
    fs.writeFileSync(
      path.join('./public', 'feed.json'),
      JSON.stringify(await createJsonFeed(posts)),
      'utf8'
    )
  } catch (error) {
    throw Error('\nFailed to write JSON Feed file: ', error)
  }
  console.log('\nsuccess Generating JSON feed')
}

export { generateJsonFeed, feedContent }
