---
date: 2018-11-01T19:08:00.367Z

title: Matomo plugin for Gatsby
image: gatsby-plugin-matomo-teaser.png
changelog: gatsby-plugin-matomo

tags:
  - goodies
  - gatsby
  - matomo
  - development

featured: true
toc: true
---

Plugin for [Gatsby](https://www.gatsbyjs.org) to add tracking with the open-source analytics platform [Matomo](https://matomo.org) (formerly Piwik) onto a site, prioritizing user experience & privacy with sensible defaults.

## Features

- include tracking code in all server-side rendered routes
- track all route views as custom events
- load tracking scripts at end of body tag
- use image tracking fallback for `<noscript>`
- don't load anything when visitor has Do Not Track enabled
- don't load anything in non-production environments
- consent mode for privacy
- allow loading tracking script locally
- define paths to be excluded from tracking
- dev mode for local development

## Usage

First, install the plugin from your project's root:

```bash
cd yourproject/
npm i gatsby-plugin-matomo
```

Then load the plugin from your `gatsby-config.js` and set the required variables:

```js
plugins: [
  {
    resolve: 'gatsby-plugin-matomo',
    options: {
      siteId: 'YOUR_SITE_ID',
      matomoUrl: 'https://YOUR_MATOMO_URL.COM',
      siteUrl: 'https://YOUR_LIVE_SITE_URL.COM'
    }
  }
]
```

## Check out & contribute

Head over to GitHub for more documentation, take a peek into the code, or to report some bugs.

<p class="content-download">
    <a class="icon-github btn btn-primary" href="https://github.com/kremalicious/gatsby-plugin-matomo">GitHub</a>
</p>
