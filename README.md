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
  <a href="https://www.codacy.com/app/kremalicious/blog?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=kremalicious/blog&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/63a594f4e2324b22986068ef2400ed87"/></a>
  <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/kremalicious/blog.svg" /></a>
</p>

## Table of Contents

---

## 🎉 Features

The whole [blog](https://kremalicious.com) is a React-based Single Page App built with [Gatsby v2](https://www.gatsbyjs.org).

### EXIF extraction

...

### 🏆 SEO component

Includes a SEO component which automatically switches all required `meta` tags for search engines, Twitter Cards, and Facebook OpenGraph tags based on the browsed route/page.

If you want to know how, have a look at the respective component under [`src/components/atoms/SEO.jsx`](src/components/atoms/SEO.jsx)

### 📈 Matomo (formerly Piwik) analytics tracking

Site sends usage statistics to my own [Matomo](https://matomo.org) installation. To make this work in Gatsby, I created and open sourced a plugin, [gatsby-plugin-matomo](https://github.com/kremalicious/gatsby-plugin-matomo), which is in use on this site.

### 💎 Importing SVG assets

All SVG assets under `src/images/` will be converted to React components with the help of [gatsby-plugin-svgr](https://github.com/zabute/gatsby-plugin-svgr). Makes use of [SVGR](https://github.com/smooth-code/svgr) so SVG assets can be imported like so:

```js
import { ReactComponent as Logo } from './components/svg/Logo'

<Logo />
```

### 🍬 Typekit component

Includes a component for adding the Typekit snippet.

If you want to know how, have a look at the respective component under [`src/components/atoms/Typekit.jsx`](src/components/atoms/Typekit.jsx)

## ✨ Development

You need to have the following tools installed on your development machine before moving on:

- [Node.js](http://nodejs.org/)
- [npm](https://npmjs.org/)

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

### 🎈 Add a new project

...

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
