const fs = require('fs')
const path = require('path')
const pify = require('pify')
const { siteUrl, siteTitle, siteDescription, author } = require('../config')
const writeFile = pify(fs.writeFile)

const feedContent = edge => {
  const { image } = edge.node.frontmatter
  const { html } = edge.node
  const footer =
    '<hr />This post was published on <a href="https://kremalicious.com">kremalicious.com</a>'

  return image
    ? `<img src="${image.childImageSharp.resize.src}" /><br />${html}${footer}`
    : `${html}${footer}`
}

const generateJsonFeed = async posts => {
  const jsonItems = await posts.map(edge => {
    const { frontmatter, fields, excerpt } = edge.node
    const { slug, date } = fields

    return {
      id: path.join(siteUrl, slug),
      url: path.join(siteUrl, slug),
      title: frontmatter.title,
      summary: excerpt,
      date_published: new Date(date).toISOString(),
      date_modified: frontmatter.updated
        ? new Date(frontmatter.updated).toISOString()
        : new Date(date).toISOString(),
      tags: [frontmatter.tags],
      content_html: feedContent(edge)
    }
  })

  const jsonFeed = {
    version: 'https://jsonfeed.org/version/1',
    title: siteTitle,
    description: siteDescription,
    home_page_url: siteUrl,
    feed_url: path.join(siteUrl, 'feed.json'),
    user_comment:
      'This feed allows you to read the posts from this site in any feed reader that supports the JSON Feed format. To add this feed to your reader, copy the following URL — https://kremalicious.com/feed.json — and add it your reader.',
    favicon: path.join(siteUrl, 'favicon.ico'),
    icon: path.join(siteUrl, 'apple-touch-icon.png'),
    author: {
      name: author.name,
      url: author.uri
    },
    items: jsonItems
  }

  await writeFile(
    path.join('./public', 'feed.json'),
    JSON.stringify(jsonFeed),
    'utf8'
  ).catch(err => {
    throw Error('\nFailed to write JSON Feed file: ', err)
  })

  // eslint-disable-next-line no-console
  console.log('\nsuccess Generating JSON feed')
}

module.exports = { generateJsonFeed, feedContent }
