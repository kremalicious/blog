<p align="center">
  <a href="https://kremalicious.com"><img src="https://raw.githubusercontent.com/kremalicious/portfolio/main/public/github-header.png" alt="GitHub Header" /></a>
 </p>
<p align="center">
  <strong>🍭 My blog built with <a href="https://astro.build">Astro</a> + TypeScript. Neat.</strong>
</p>
<p align="center">
  <a href="https://kremalicious.com">kremalicious.com</a>
</p>
<p align="center">
  <a href="https://github.com/kremalicious/blog/actions"><img src="https://github.com/kremalicious/blog/workflows/CI/badge.svg" alt="CI workflow badge" /></a>
  <a href="https://codeclimate.com/github/kremalicious/blog/maintainability"><img src="https://api.codeclimate.com/v1/badges/4e86c791349cd12368cd/maintainability" alt="CodeClimate maintainability badge" /></a>
  <a href="https://codeclimate.com/github/kremalicious/blog/test_coverage"><img src="https://api.codeclimate.com/v1/badges/4e86c791349cd12368cd/test_coverage" alt="CodeClimate coverage badge" /></a>
</p>

---

- [🎉 Features](#-features)
  - [🌅 Image handling](#-image-handling)
  - [🎆 EXIF extraction](#-exif-extraction)
  - [💰 Cryptocurrency donation via Web3 browser wallets](#-cryptocurrency-donation-via-web3-browser-wallets)
  - [🔍 Search](#-search)
  - [🕸 Related Posts](#-related-posts)
  - [📝 GitHub Changelog Rendering](#-github-changelog-rendering)
  - [🌗 Theme Switcher](#-theme-switcher)
  - [💎 SVG assets as components](#-svg-assets-as-components)
  - [astro-redirect-from](#astro-redirect-from)
  - [RSS \& JSON feeds](#rss--json-feeds)
- [✨ Development](#-development)
  - [🔮 Linting](#-linting)
  - [🔮 Type Checking](#-type-checking)
  - [👩‍🔬 Testing](#-testing)
- [🎈 Content creation helpers](#-content-creation-helpers)
  - [Add a new post](#add-a-new-post)
- [🚚 Deployment](#-deployment)
  - [S3 Deployment](#s3-deployment)
- [🏛 Licenses](#-licenses)
  - [Posts](#posts)
  - [Photos \& images](#photos--images)

---

## 🎉 Features

The whole [blog](https://kremalicious.com) is a statically exported site built with [Astro](https://astro.build) and TypeScript. Almost all components are Astro or native Web Components, with some React components loaded client-side.

Styling happens through a combination of basic global styles and on components level either through CSS modules or CSS in `<style>` tags within Astro components.

Content lives under `content/` and Astro creates a content collection for each subfolder, which are then queried in components. Every post is a folder with a markdown file and all respective post assets co-located inside.

Retrieving content collections will enrich every post's frontmatter metadata, like extracting date and slug from the post folder name, or exif extraction for photos.

### 🌅 Image handling

Uses Astro's native `astro:assets` feature, all required image sizes are automatically generated from source images, working in combination with my own custom `<picture>` component. Making heavy use of Astro's `getImage()` and custom markup results in full image sizing control and properly `object-fit` images with varying aspect ratios.

Teaser images are all defined in a post's frontmatter `image` key, which is then passed to the `<Picture />` component for display.

If you want to know how this works, have a look at the respective files:

- [`src/components/Picture/index.astro`](src/components/Picture/index.astro)
- [`src/components/Picture/index.module.css`](src/components/Picture/index.module.css)

### 🎆 EXIF extraction

Automatically extracts EXIF & IPTC metadata from my photos and adds it to markdown frontmatter of respective photo posts. For minimal overhead, [fast-exif](https://github.com/titarenko/fast-exif) & [node-iptc](https://github.com/derekbaron/node-iptc) is used to parse every JPG file whenever a content collection is accessed.

In the end looks like this, including location display with [pigeon-maps](https://github.com/mariusandra/pigeon-maps):

<img width="1098" alt="screen shot 2018-10-14 at 20 27 39" src="https://user-images.githubusercontent.com/90316/46920507-9d6b7a00-cfef-11e8-84c8-a1997f471cae.png">

If you want to know how this works, have a look at the respective files:

- EXIF extraction with `readOutExif()` helper in [`src/lib/exif/index.ts`](src/lib/exif/index.ts)
- the `loadAndFormatCollection()` helper in [`src/lib/astro.ts`](src/lib/astro.ts)
- output through [`src/components/Exif/`](src/components/Exif/)

### 💰 Cryptocurrency donation via Web3 browser wallets

Lets visitors say thanks with Ether, any ERC-20, or Bitcoin. The Web3 wallet integration uses [RainbowKit](https://www.rainbowkit.com) for wallet connection, my own custom web3 API to fetch wallet token balances and metadata, and [wagmi](https://wagmi.sh) for sending transactions.

<img width="502" alt="Screenshot 2023-11-05 at 20 18 50" src="https://github.com/kremalicious/blog/assets/90316/7eadf4e9-6e98-4cf6-9639-aebf42ac0d4e">

<img width="487" alt="Screenshot 2023-11-05 at 20 20 04" src="https://github.com/kremalicious/blog/assets/90316/2421e64c-2d98-4e2a-a67a-ab1b5640bfb6">

If you want to know how this works, have a look at the respective feature under

- [`src/features/Web3/`](src/features/Web3/)

### 🔍 Search

A global search is provided with fuse.js. Whenever search is opened, all posts metadata is fetched, which is then queried against when the search field is used. This prevents a huge search index from being bundled in the site build.

<img width="700" alt="screen shot 2018-11-18 at 19 44 30" src="https://user-images.githubusercontent.com/90316/48676679-634f4400-eb6a-11e8-936d-293505d5c5d9.png">

If you want to know how this works, have a look at the respective feature under

- [`src/features/Search/`](src/features/Search/)

### 🕸 Related Posts

Under each post a list of related posts is displayed which are based on the tags and other metadata of the currently viewed post, also done with fuse.js.

<img width="700" alt="screen shot 2018-10-11 at 21 03 03" src="https://user-images.githubusercontent.com/90316/46827531-14f39c00-cd99-11e8-84aa-0e851c32c89c.png" />

If you want to know how this works, have a look at the respective component under

- [`src/components/RelatedPosts/`](src/components/RelatedPosts/)

### 📝 GitHub Changelog Rendering

Adds ability to show contents of a changelog, rendered from a `CHANGELOG.md` on GitHub from the given repository. The use case is to enhance release posts about projects hosted on GitHub. Makes use of the GitHub GraphQL API.

Adding this to a post's YAML frontmatter:

```yaml
changelog: kremalicious/gatsby-plugin-matomo
```

will render this at the end of the post:

<img width="700" alt="screen shot 2018-11-21 at 23 03 38" src="https://user-images.githubusercontent.com/90316/48870593-bc74dd00-ede1-11e8-9051-df55ab7b48d1.png">

See it live e.g. on [Matomo plugin for Gatsby](https://kremalicious.com/gatsby-plugin-matomo#changelog).

If you want to know how this works, have a look at the respective component under

- [`src/components/Changelog/`](src/components/Changelog/)
- the `getRepo()` helper in [`src/lib/github/github.ts`](src/lib/github/github.ts)

### 🌗 Theme Switcher

Includes a theme switcher which allows user to toggle between a light and a dark theme. Switching between them also happens automatically based on user's system preferences.

If you want to know how, have a look at the respective components:

- [`src/components/ThemeSwitch/`](src/components/ThemeSwitch/)

### 💎 SVG assets as components

All SVG assets under `src/images/` and from select iconset dependencies are converted to Astro & React components before building the site. Compiled components are placed under `src/images/components/` and all include the cleaned SVGs as inline HTML.

All SVGs can then be imported from `@images/components` in all Astro or React components.

If you want to know how this works, have a look at the script:

- [`scripts/create-icons/`](scripts/create-icons/)

### astro-redirect-from

Still a remnant of the old [Jekyll](https://jekyllrb.com) days, which survived in [gatsby-redirect-from](https://kremalicious.com/gatsby-redirect-from/) and now works in Astro with [astro-redirect-from](https://kremalicious.com/astro-redirect-from/).

For all post slugs defined in a `redirect_from` frontmatter key, redirects will be put in place by Astro.

### RSS & JSON feeds

Generates rss & json feeds upon build time.

If you want to know how this works, have a look at the respective files:

- [`src/pages/feed.json.ts`](src/pages/feed.json.ts)
- [`src/pages/feed.xml.ts`](src/pages/feed.xml.ts)

## ✨ Development

```bash
git clone git@github.com:kremalicious/blog.git
cd blog/

# required env vars
cp .env.sample .env
vi .env

npm i
npm start
```

### 🔮 Linting

[Biome](https://biomejs.dev) is setup for all linting and formatting purposes:

```bash
npm run lint
```

### 🔮 Type Checking

Type checking can be invoked to check all TypeScript code, including within .astro files:

```bash
npm run typecheck
```

### 👩‍🔬 Testing

Test suite is setup with [Vitest](https://vitest.dev), [react-testing-library](https://github.com/kentcdodds/react-testing-library), and [Playwright](https://playwright.dev).

All unit test files live beside the respective component with naming pattern `*.test.ts(x)`. Integration test files live under `./test/e2e/` exclusively, with naming pattern `*.spec.ts`.

Testing setup, fixtures, and mocks shared between unit & integration tests can be found in `./test` folder.

To run all unit tests:

```bash
npm run test:unit

# watch mode
npm run test:unit:watch
```

For End-to-End integration testing, ideally run against the production build:

```bash
npm run build && npm run preview

# mapping `playwright` command
npm run test:e2e
npm run test:e2e -- --ui
npm run test:e2e -- path/to/file.spec.ts.
npm run test:e2e -- --update-snapshots
```

## 🎈 Content creation helpers

### Add a new post

```bash
npm run new "Hello World"
npm run new "Hello World" 2017-12-27
```

Create a new photo post with date, title & description pre-filled from EXIF/IPTC data of a given image file:

```bash
npm run new photo /path/to/photo.jpg
npm run new photo /path/to/photo.jpg "Hello Photo Post"
```

- [`scripts/new/`](scripts/new/)

## 🚚 Deployment

Every branch or Pull Request is automatically deployed by [Vercel](https://vercel.com) with their GitHub integration. A link to a preview deployment will appear under each Pull Request. Vercel is not used for the production deployment.

### S3 Deployment

The latest deployment of the `main` branch is automatically deployed to S3 from the GitHub Action as the production deployment, aliased to `kremalicious.com`. The deploy command simply calls the [`scripts/deploy-s3.sh`](scripts/deploy-s3.sh) script, syncing the contents of the `dist/` folder to S3:

```bash
npm run deploy:s3
```

## 🏛 Licenses

The MIT License (MIT)

EXCEPT FOR:

### Posts

[![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

All post content under `./content/articles` & `./content/links` is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).

### Photos & images

All photos & image assets are plain ol' copyright.

Copyright (c) 2008–2023 Matthias Kretschmann

Don't care if you fork & play with it, but you're not allowed to publish anything from it as a whole without my written permission. Also please be aware, the combination of typography, colors & layout makes up my brand identity. So please don't just clone everything, but rather do a remix!
