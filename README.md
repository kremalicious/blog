<p align="center">
  <a href="https://kremalicious.com"><img src="src/images/github-header.png" /></a>
 </p>
<p align="center">
  <strong>🍭 My blog built with <a href="http://gatsbyjs.org">Gatsby</a>. Neat.</strong>
</p>
<p align="center">
  <a href="https://kremalicious.com">kremalicious.com</a>
</p>
<p align="center">
  <a href="https://travis-ci.com/kremalicious/blog"><img src="https://travis-ci.com/kremalicious/blog.svg?branch=master" /></a>
  <a href="https://codeclimate.com/github/kremalicious/blog/maintainability"><img src="https://api.codeclimate.com/v1/badges/4e86c791349cd12368cd/maintainability" /></a>
  <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/kremalicious/blog.svg" /></a>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [🎉 Features](#-features)
  - [🎆 EXIF extraction](#-exif-extraction)
  - [💰 Cryptocurrency donation via Web3/MetaMask](#-cryptocurrency-donation-via-web3metamask)
  - [🕸 Related Posts](#-related-posts)
  - [🐝 Coinhive](#-coinhive)
  - [🏆 SEO component](#-seo-component)
  - [📈 Matomo (formerly Piwik) analytics tracking](#-matomo-formerly-piwik-analytics-tracking)
  - [gatsby-redirect-from](#gatsby-redirect-from)
  - [💎 Importing SVG assets](#-importing-svg-assets)
  - [🍬 Typekit component](#-typekit-component)
- [✨ Development](#-development)
  - [🔮 Linting](#-linting)
  - [🎈 Add a new post](#-add-a-new-post)
- [🚚 Deployment](#-deployment)
- [🏛 Licenses](#-licenses)
  - [Posts](#posts)
  - [Photos & images](#photos--images)

---

## 🎉 Features

The whole [blog](https://kremalicious.com) is a React-based Single Page App built with [Gatsby v2](https://www.gatsbyjs.org).

### 🎆 EXIF extraction

Automatically extracts EXIF metadata from my photos on build time. For minimal overhead, [fast-exif](https://github.com/titarenko/fast-exif) parses every JPG file upon Gatsby file node creation and adds the extracted EXIF data as node fields.

This way, EXIF data is only extracted at build time and can be simply queried with GraphQL at run time.

In the end looks like this, including location display with [pigeon-maps](https://github.com/mariusandra/pigeon-maps):

<img width="1098" alt="screen shot 2018-10-14 at 20 27 39" src="https://user-images.githubusercontent.com/90316/46920507-9d6b7a00-cfef-11e8-84c8-a1997f471cae.png">

If you want to know how this works, have a look at the respective component under

- [`src/components/atoms/Exif.jsx`](src/components/atoms/Exif.jsx)
- the EXIF node fields creation [`gatsby/exif.js`](gatsby/exif.js) running in [`gatsby-node.js`](gatsby-node.js)

### 💰 Cryptocurrency donation via Web3/MetaMask

Lets visitors say thanks with Bitcoin or Ether. Uses [web3.js](https://github.com/ethereum/web3.js) for sending Ether transactions via MetaMask, Brave or Mist. Component listens to account & network changes and adapts accordingly.

As a fallback, QR codes are generated with [react-qr-svg](https://github.com/no23reason/react-qr-svg) from the addresses defined in [`config.js`](config.js).

<img width="1082" alt="screen shot 2018-10-14 at 22 03 57" src="https://user-images.githubusercontent.com/90316/46921544-1a512080-cffd-11e8-919f-d3e86dbd5cc5.png" />

If you want to know how this works, have a look at the respective components under

- [`src/components/Web3Donation/index.jsx`](src/components/Web3Donation/index.jsx)
- [`src/components/Web3Donation/Account.jsx`](src/components/Web3Donation/Account.jsx)
- [`src/components/Web3Donation/InputGroup.jsx`](src/components/Web3Donation/InputGroup.jsx)
- [`src/components/Web3Donation/Conversion.jsx`](src/components/Web3Donation/Conversion.jsx)
- [`src/components/Web3Donation/Alerts.jsx`](src/components/Web3Donation/Alerts.jsx)
- [`src/components/Web3Donation/utils.jsx`](src/components/Web3Donation/utils.jsx)
- [`src/components/atoms/Qr.jsx`](src/components/atoms/Qr.jsx)

### 🕸 Related Posts

Under each post a list of related posts is displayed which are based on the tags of the currently viewed post. Also allows loading more related posts in place.

<img width="691" alt="screen shot 2018-10-11 at 21 03 03" src="https://user-images.githubusercontent.com/90316/46827531-14f39c00-cd99-11e8-84aa-0e851c32c89c.png" />

If you want to know how this works, have a look at the respective component under

- [`src/components/molecules/RelatedPosts.jsx`](src/components/molecules/RelatedPosts.jsx)

### 🐝 Coinhive

Includes a component for mining Monero with JavaScript via [Coinhive](https://coinhive.com).

<img width="166" alt="screen shot 2018-10-11 at 21 09 49" src="https://user-images.githubusercontent.com/90316/46827858-03f75a80-cd9a-11e8-84f1-65b7d0027124.png" />

Functionality is opt-in on a post basis. Simply add this to any post's frontmatter to activate it for this post:

```yaml
coinhive: true
```

If you want to know how this works, have a look at the respective component under

- [`src/components/atoms/Coinhive.jsx`](src/components/atoms/Coinhive.jsx)

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

```js
import { ReactComponent as Logo } from './components/svg/Logo'

<Logo />
```

### 🍬 Typekit component

Includes a component for adding the Typekit snippet.

If you want to know how this works, have a look at the respective component under

- [`src/components/atoms/Typekit.jsx`](src/components/atoms/Typekit.jsx)

## ✨ Development

You need to have the following tools installed on your development machine before moving on:

- [Node.js](http://nodejs.org/)
- [npm](https://npmjs.org/)

Then install dependencies and start everything up:

```bash
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

### 🎈 Add a new post

```bash
npm run new "Hello World"
npm run new "Hello World" 2017-12-27
```

```bash
npm run new "Hello World" photo
npm run new "Hello World" photo 2017-12-27
```

- [`scripts/new.js`](scripts/new.js)
- [`scripts/new.md`](scripts/new.md)

## 🚚 Deployment

Automatic deployments are triggered upon successful tests & builds on Travis:

- push to `master` initiates a live deployment
- any Pull Request, and subsequent pushes to it, initiates a beta deployment

The deploy command simply calls the [`scripts/deploy.sh`](scripts/deploy.sh) script, syncing the contents of the `public/` folder to S3:

```bash
npm run deploy
```

The deploymeng script can be used locally too, the branch checks are only happening for Travis builds, allowing to deploy any branch from local machine.

## 🏛 Licenses

The MIT License (MIT)

except for:

### Posts

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
  <img alt="Creative Commons License" style="border-width:0;" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" />
</a>

All post content under `./content/posts` is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

### Photos & images

All photos & image assets under `./content/media`, `./src/images`, and `assets sheet.psd` are plain ol' copyright.

Copyright (c) 2008–2018 Matthias Kretschmann

Don't care if you fork & play with it, but you're not allowed to publish anything from it as a whole without my written permission.
