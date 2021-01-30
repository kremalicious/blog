<p align="center">
  <a href="https://kremalicious.com"><img src="[src/images/github-header.png](https://raw.githubusercontent.com/kremalicious/portfolio/main/src/images/github-header.png)" /></a>
 </p>
<p align="center">
  <strong>🍭 My blog built with <a href="http://gatsbyjs.org">Gatsby</a> + TypeScript. Neat.</strong>
</p>
<p align="center">
  <a href="https://kremalicious.com">kremalicious.com</a>
</p>
<p align="center">
  <a href="https://github.com/kremalicious/blog/actions"><img src="https://github.com/kremalicious/blog/workflows/CI/badge.svg" /></a>
  <a href="https://codeclimate.com/github/kremalicious/blog/maintainability"><img src="https://api.codeclimate.com/v1/badges/4e86c791349cd12368cd/maintainability" /></a>
  <a href="https://codeclimate.com/github/kremalicious/blog/test_coverage"><img src="https://api.codeclimate.com/v1/badges/4e86c791349cd12368cd/test_coverage" /></a>
</p>

---

- [🎉 Features](#-features)
  - [🎆 EXIF extraction](#-exif-extraction)
  - [💰 Cryptocurrency donation via Web3/MetaMask](#-cryptocurrency-donation-via-web3metamask)
  - [🔍 Search](#-search)
  - [🕸 Related Posts](#-related-posts)
  - [📝 GitHub changelog rendering](#-github-changelog-rendering)
  - [🌗 Theme Switcher](#-theme-switcher)
  - [🏆 SEO component](#-seo-component)
  - [📈 Matomo (formerly Piwik) analytics tracking](#-matomo-formerly-piwik-analytics-tracking)
  - [gatsby-redirect-from](#gatsby-redirect-from)
  - [💎 Importing SVG assets](#-importing-svg-assets)
  - [🍬 Typekit component](#-typekit-component)
- [✨ Development](#-development)
  - [🔮 Linting](#-linting)
  - [👩‍🔬 Testing](#-testing)
  - [🎈 Add a new post](#-add-a-new-post)
- [🚚 Deployment](#-deployment)
  - [S3 Deployment](#s3-deployment)
- [🏛 Licenses](#-licenses)
  - [Posts](#posts)
  - [Photos & images](#photos--images)

---

## 🎉 Features

The whole [blog](https://kremalicious.com) is a React-based Single Page App built with [Gatsby v2](https://www.gatsbyjs.org).

### 🎆 EXIF extraction

Automatically extracts EXIF & IPTC metadata from my photos on build time. For minimal overhead, [fast-exif](https://github.com/titarenko/fast-exif) & [node-iptc](https://github.com/derekbaron/node-iptc) parse every JPG file upon Gatsby file node creation and add the extracted data as node fields.

This way, EXIF data is only extracted at build time and can be simply queried with GraphQL at run time.

In the end looks like this, including location display with [pigeon-maps](https://github.com/mariusandra/pigeon-maps):

<img width="1098" alt="screen shot 2018-10-14 at 20 27 39" src="https://user-images.githubusercontent.com/90316/46920507-9d6b7a00-cfef-11e8-84c8-a1997f471cae.png">

If you want to know how this works, have a look at the respective component under

- [`src/components/atoms/Exif.jsx`](src/components/atoms/Exif.jsx)
- the EXIF node fields creation [`gatsby/createExif.js`](gatsby/createExif.js) running in [`gatsby-node.js`](gatsby-node.js)

### 💰 Cryptocurrency donation via Web3/MetaMask

Lets visitors say thanks with Bitcoin or Ether. Uses [web3.js](https://github.com/ethereum/web3.js) for sending Ether transactions via MetaMask, Brave or Mist. Component listens to account & network changes and adapts accordingly.

As a fallback, QR codes are generated with [react-qr-svg](https://github.com/no23reason/react-qr-svg) from the addresses defined in [`config.js`](config.js).

<img width="700" alt="screen shot 2018-10-14 at 22 03 57" src="https://user-images.githubusercontent.com/90316/46921544-1a512080-cffd-11e8-919f-d3e86dbd5cc5.png" />

If you want to know how this works, have a look at the respective components under

- [`src/components/molecules/Web3Donation/index.jsx`](src/components/molecules/Web3Donation/index.jsx)
- [`src/components/molecules/Web3Donation/Account.jsx`](src/components/molecules/Web3Donation/Account.jsx)
- [`src/components/molecules/Web3Donation/InputGroup.jsx`](src/components/molecules/Web3Donation/InputGroup.jsx)
- [`src/components/molecules/Web3Donation/Conversion.jsx`](src/components/molecules/Web3Donation/Conversion.jsx)
- [`src/components/molecules/Web3Donation/Alerts.jsx`](src/components/molecules/Web3Donation/Alerts.jsx)
- [`src/components/molecules/Web3Donation/utils.jsx`](src/components/molecules/Web3Donation/utils.jsx)
- [`src/components/atoms/Qr.jsx`](src/components/atoms/Qr.jsx)

### 🔍 Search

A global search is provided with [gatsby-plugin-lunr](https://github.com/humanseelabs/gatsby-plugin-lunr). That plugin creates a [Lunr](https://lunrjs.com) search index file of all posts on build time which is then queried against when the search field is used.

<img width="700" alt="screen shot 2018-11-18 at 19 44 30" src="https://user-images.githubusercontent.com/90316/48676679-634f4400-eb6a-11e8-936d-293505d5c5d9.png">

If you want to know how this works, have a look at the respective components under

- [`src/components/molecules/Search/Search.jsx`](src/components/molecules/Search/Search.jsx)
- [`src/components/molecules/Search/SearchResults.jsx`](src/components/molecules/Search/SearchResults.jsx)
- more in [`src/components/molecules/Search/`](src/components/molecules/Search/)

### 🕸 Related Posts

Under each post a list of related posts is displayed which are based on the tags of the currently viewed post. Also allows loading more related posts in place.

<img width="700" alt="screen shot 2018-10-11 at 21 03 03" src="https://user-images.githubusercontent.com/90316/46827531-14f39c00-cd99-11e8-84aa-0e851c32c89c.png" />

If you want to know how this works, have a look at the respective component under

- [`src/components/molecules/RelatedPosts.jsx`](src/components/molecules/RelatedPosts.jsx)

### 📝 GitHub changelog rendering

Adds ability to show contents of a changelog, rendered from a `CHANGELOG.md` on GitHub from the given repository. The use case is to enhance release posts about projects hosted on GitHub. Makes use of the GitHub GraphQL API via [gatsby-source-graphql](https://www.gatsbyjs.org/packages/gatsby-source-graphql/).

Adding this to a post's YAML frontmatter:

```yaml
changelog: gatsby-plugin-matomo
```

will render this at the end of the post:

<img width="700" alt="screen shot 2018-11-21 at 23 03 38" src="https://user-images.githubusercontent.com/90316/48870593-bc74dd00-ede1-11e8-9051-df55ab7b48d1.png">

See it live on [Matomo plugin for Gatsby](https://kremalicious.com/gatsby-plugin-matomo#changelog).

If you want to know how this works, have a look at the respective component under

- [`src/components/atoms/Changelog.jsx`](src/components/atoms/Changelog.jsx)

### 🌗 Theme Switcher

Includes a theme switcher which allows user to toggle between a light and a dark theme. Switching between them also happens automatically based on user's system preferences utilizing [use-dark-mode](https://github.com/donavon/use-dark-mode).

If you want to know how, have a look at the respective components:

- [`src/components/molecules/ThemeSwitch.jsx`](src/components/molecules/ThemeSwitch.jsx)

### 🏆 SEO component

Includes a SEO component which automatically switches all required `meta` tags for search engines, Twitter Cards, and Facebook OpenGraph tags based on the browsed route/page.

If you want to know how this works, have a look at the respective component under

- [`src/components/atoms/SEO.jsx`](src/components/atoms/SEO.jsx)

### 📈 Matomo (formerly Piwik) analytics tracking

Site sends usage statistics to my own [Matomo](https://matomo.org) installation. To make this work in Gatsby, I created and open sourced a plugin which is in use on this site.

- [gatsby-plugin-matomo](https://github.com/kremalicious/gatsby-plugin-matomo)

### gatsby-redirect-from

- [gatsby-redirect-from](https://github.com/kremalicious/gatsby-redirect-from)

### 💎 Importing SVG assets

All SVG assets under `src/images/` will be converted to React components with the help of [gatsby-plugin-svgr](https://github.com/zabute/gatsby-plugin-svgr). Makes use of [SVGR](https://github.com/smooth-code/svgr) so SVG assets can be imported like so:

```jsx
import { ReactComponent as Logo } from './components/svg/Logo'
;<Logo />
```

### 🍬 Typekit component

Includes a component for adding the Typekit snippet.

If you want to know how this works, have a look at the respective component under

- [`src/components/atoms/Typekit.jsx`](src/components/atoms/Typekit.jsx)

## ✨ Development

You can simply use [Docker](https://www.docker.com) & [Docker Compose](https://docs.docker.com/compose/) or install and run dependencies on your local system.

```bash
git clone git@github.com:kremalicious/blog.git
cd blog/

# GATSBY_GITHUB_TOKEN is required for some parts
cp .env.sample .env
vi .env

# use Docker
docker-compose up

# or go with local system
npm i
npm start
```

### 🔮 Linting

ESlint, Prettier, and Stylelint are setup for all linting purposes:

```bash
npm run lint
```

To automatically format all code files:

```bash
npm run format
npm run format:css
```

### 👩‍🔬 Testing

Test suite is setup with [Jest](https://jestjs.io) and [react-testing-library](https://github.com/kentcdodds/react-testing-library).

To run all tests, including all linting tests:

```bash
npm test
```

All test files live beside the respective component. Testing setup, fixtures, and mocks can be found in `./jest.config.js` and `./jest` folder.

For local development, run the test watcher:

```bash
npm run test:watch
```

### 🎈 Add a new post

```bash
npm run new "Hello World"
npm run new "Hello World" 2017-12-27
```

Create a new photo post with date, title & description pre-filled from EXIF/IPTC data of a given image file:

```bash
npm run new photo /path/to/photo.jpg
```

- [`scripts/new.js`](scripts/new.js)
- [`scripts/new.md`](scripts/new.md)
- [`scripts/new-photo.md`](scripts/new-photo.md)

## 🚚 Deployment

Every branch or Pull Request is automatically deployed by [Vercel](https://vercel.com) with their GitHub integration. A link to a preview deployment will appear under each Pull Request.

The latest deployment of the `main` branch is automatically aliased to `kremalicious.com`.

### S3 Deployment

The deploy command simply calls the [`scripts/deploy-s3.sh`](scripts/deploy-s3.sh) script, syncing the contents of the `public/` folder to S3:

```bash
npm run deploy:s3
```

## 🏛 Licenses

The MIT License (MIT)

EXCEPT FOR:

### Posts

[![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

All post content under `./content/posts` is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).

### Photos & images

All photos & image assets are plain ol' copyright.

Copyright (c) 2008–2018 Matthias Kretschmann

Don't care if you fork & play with it, but you're not allowed to publish anything from it as a whole without my written permission. Also please be aware, the combination of typography, colors & layout makes up my brand identity. So please don't just clone everything, but rather do a remix!
