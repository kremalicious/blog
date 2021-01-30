---
type: post
date: 2020-05-22T14:08:00.367Z
updated: 2020-05-23T11:35:12+02:00

title: Redirect plugin for Markdown Pages in Gatsby
image: gatsby-redirect-from-teaser.png
changelog: gatsby-redirect-from

tags:
  - goodies
  - gatsby
  - development

toc: true
---

Plugin for [Gatsby](https://www.gatsbyjs.org) to create redirects based on a list in your Markdown frontmatter, mimicking the behavior of [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from).

## Features

By adding a `redirect_from` list of URLs to your Markdown file's YAML frontmatter, this plugin creates client-side redirects for all of them at build time, with Gatsby's [createRedirect](https://www.gatsbyjs.org/docs/actions/#createRedirect) used under the hood.

By combining this plugin with [gatsby-plugin-meta-redirect](https://github.com/getchalk/gatsby-plugin-meta-redirect) you get simple server-side redirects from your `redirect_from` lists out of the box. You can also combine it with any other plugin picking up Gatsby `createRedirect` calls to get proper SEO-friendly [server-side redirects](#server-side-redirects) for your hosting provider.

## Usage

First, install the plugin from your project's root:

```bash
cd yourproject/
npm i gatsby-redirect-from gatsby-plugin-meta-redirect
```

Then add it to your `gatsby-config.js` file under `plugins`:

```js
plugins: [
  'gatsby-redirect-from',
  'gatsby-plugin-meta-redirect' // make sure this is always the last one
]
```

That's it for the configuration.

Finally, use the key `redirect_from` followed by a list in your Markdown file's YAML frontmatter:

```yaml
---
title: Aperture File Types
redirect_from:
  - /new-goodies-aperture-file-types-icons/
  - /goodie-updated-aperture-file-types-v11/
  - /aperture-file-types-v12-released/
  - /2008/04/aperture-file-types/
  # note: trailing slashes are required
---

```

## Default Query

Plugin assumes the default setup from [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog), with Markdown files processed by [gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark), and adding a field `slug` for each markdown node. Resulting in the availability of a `allMarkdownRemark` query.

Head over to `gatsby-starter-blog`'s [`gatsby-node.js`](https://github.com/gatsbyjs/gatsby-starter-blog/blob/master/gatsby-node.js#L57) file to see how this is done, or follow the [Adding Markdown Pages](https://www.gatsbyjs.org/docs/adding-markdown-pages/) tutorial.

Optionally, you can pass a different query to this [plugin's configuration](#options).

## Server-Side Redirects

Gatsby's `createRedirect` only creates client-side redirects, so further integration is needed to get SEO-friendly server-side redirects or make your redirects work when users have JavaScript disabled. Which is highly dependent on your hosting provider: if you want to have the proper HTML status codes like `301`, Apache needs `.htaccess` rules for that, Nginx needs `rewrite` rules, S3 needs `RoutingRules`, Vercel needs entries in a `vercel.json`, Netlify needs a `_redirects` file, and so on.

One simple way, as suggested by default in installation, is to use [gatsby-plugin-meta-redirect](https://github.com/getchalk/gatsby-plugin-meta-redirect) to generate static HTML files with a `<meta http-equiv="refresh" />` tag for every `createRedirect` call in their `<head>`. So it works out of the box with this plugin without further adjustments.

This way is the most compatible way of handling redirects, working with pretty much every hosting provider. Only catch: it's only for usability, no SEO-friendly `301` redirect is set anywhere.

For some hosting providers additional plugins are available which will pick up the redirects created by this plugin and create server-side redirects for you. Be sure to add any of those plugins after `gatsby-redirect-from` in your `gatsby-config.js`:

| Provider | Plugin                                                                                                |
| -------- | ----------------------------------------------------------------------------------------------------- |
| Netlify  | [gatbsy-plugin-netlify](https://www.gatsbyjs.org/packages/gatsby-plugin-netlify/)                     |
| Vercel   | [gatsby-plugin-zeit-now](https://github.com/universse/gatsby-plugin-zeit-now)                         |
| AWS S3   | [gatsby-plugin-s3](https://www.gatsbyjs.org/packages/gatsby-plugin-s3)                                |
| Nginx    | [gatsby-plugin-nginx-redirect](https://github.com/gimoteco/gatsby-plugin-nginx-redirect)              |
| Apache   | [gatsby-plugin-htaccess-redirects](https://github.com/GatsbyCentral/gatsby-plugin-htaccess-redirects) |

## Options

Plugin does not require to be configured but additional customization options are available:

| Option  | Default             | Description                                                                                      |
| ------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| `query` | `allMarkdownRemark` | Modify the query being used to get the frontmatter data. E.g. if you use MDX, set `allMdx` here. |

Add options to the plugins's configuration object in `gatsby-config.js` like so:

```js
plugins: [
  {
    resolve: 'gatsby-redirect-from',
    options: {
      query: 'allMdx'
    }
  },
  'gatsby-plugin-meta-redirect' // make sure this is always the last one
]
```

## Check out & contribute

Head over to GitHub for more documentation, take a peek into the code, or to report some bugs.

<p class="content-download">
    <a class="icon-github btn-primary" href="https://github.com/kremalicious/gatsby-redirect-from">GitHub</a>
</p>
