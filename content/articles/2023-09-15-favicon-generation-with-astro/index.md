---
date: 2023-09-15T12:02:30.000Z

title: Favicon Generation with Astro
image: ./favicon-generation-with-astro-teaser.png

tags:
  - development
  - favicon
  - astro

toc: true
draft: true
---

Those small but impactful icons displayed next to a website's title in a browser tab seem like a minor detail, yet implementing favicons involves various considerations for different formats and sizes to fit a range of devices and browsers. Luckily, we can always count on Evil Martians to tell us [which files are needed](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs) in modern times. Those findings can be implemented quite easy in Astro.

This article outlines how to implement just that with [Astro](https://astro.build), utilizing its [Static File Endpoints](https://docs.astro.build/en/core-concepts/endpoints/) and [`getImage()`](https://docs.astro.build/en/guides/images/#generating-images-with-getimage) function to generate multiple favicon sizes.

This procedure assumes you are fine with all sizes being generated from one big size. If you require more control e.g. over the smaller sizes you can use the following walkthrough as a starting point.

But you might wonder why there's a need for a dynamic approach when these images could simply be added to the `public/` directory manually.

If you're fine with never changing your favicon assets, the most simple approach would be to generate all files manually into the `public/` folder, including the `manifest.json`. And then reference them with their absolute path in your `head` as described further down, skipping the dynamic image generation and manifest creation.

One significant advantage of generating favicons dynamically is cache busting. When you update your favicon, browsers might still serve the old one from cache. By generating favicons dynamically, you can ensure that the latest version is served, as, if they have changed, each build will create new, uniquely named files that bypass the cache.

## Project Structure

To begin, these are the source files we will deal with, with only 2 image assets:

```
my-astro-project/
├── src/
│ ├── pages/
│ │ └── manifest.json.ts
│ │ └── favicon.ico.ts
│ ├── layouts/
│ │ └── index.astro
│ └── images/
│ │ └── favicon.png
│ │ └── favicon.svg
```

- `src/images/`\
  Housing the original favicon images. `favicon.png` is a large-sized image (512px) that will be resized dynamically, whereas `favicon.svg` can be a SVG file that adapts to the user's light or dark mode settings.

- `src/layouts/index.astro`\
  This can be any layout template or page that contains your HTML `head` content, as we will add the links to the favicons and the manifest file in there.

- `src/pages/manifest.json.ts`\
  This is an Astro Static File Endpoint that dynamically generates the `/manifest.json` file, referencing the generated favicons. This file uses Astro's `getImage()` function to create various sizes of PNG icons from a single source image, and then includes these in the generated manifest.

### Final Generated Files

After building the project, the generated favicon files will be placed in the `dist/_astro/` directory (`dist/_image/` during development) with dynamic filenames, and correctly referenced in your `head` and `/manifest.json`. This happens automatically during the site build, so there's no need to keep track of these files manually.

This should be present in your `dist/` folder after following the rest of this article:

```
my-astro-project/
├── dist/
│   ├── favicon.ico
│   ├── manifest.json
│   ├── _astro/
│   │   └── favicon.HASH.png
│   │   └── favicon.HASH.png
│   │   └── favicon.HASH.png
│   │   └── favicon.HASH.svg
```

## Adding Favicon References to the `head`

To reference the manifest file and to generate required favicon sizes, let's update the `head` section of the site first.

In this example, we do this in a `src/layouts/index.astro` file, assuming this is then used as a shared layout in one of your `src/pages/` files. But do this wherever your `head` info gets populated in your site.

In this example layout file, let's add:

```astro title="src/layouts/index.astro"
---
import { getImage } from 'astro:assets'
import faviconSrc from '../images/favicon.png'
import faviconSvgSrc from '../images/favicon.svg'

const appleTouchIcon = await getImage({
  src: faviconSrc,
  width: 180,
  height: 180,
  format: 'png'
})
const faviconSvg = await getImage({ src: faviconSvgSrc, format: 'svg' })
---

<html>
  <head>
    {'...'}
    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="icon" href={faviconSvg.src} type="image/svg+xml" />
    <link rel="apple-touch-icon" href={appleTouchIcon.src} />
    <link rel="manifest" href="/manifest.json" />
    {'...'}
  </head>
  <body>
    {'...'}
  </body>
</html>
```

Astro's `getImage()` function is used to generate an Apple Touch Icon (180x180 PNG) on build time for static builds, or during server-side rendering. Astro will then reference those generated images in the respective `head` tags added above.

The SVG favicon is not generated anew but is essentially passed through the `getImage()` function to benefit from cache busting.

## Generating the Web Manifest

In this setup, the [manifest file](https://developer.mozilla.org/en-US/docs/Web/Manifest) is dynamically generated using Astro's [Static File Endpoints feature](https://docs.astro.build/en/core-concepts/endpoints/).

Add the following code to `src/pages/manifest.json.ts`:

```typescript title="src/pages/manifest.json.ts"
import type { APIRoute } from 'astro'
import { getImage } from 'astro:assets'
import favicon from '../images/favicon.png'

const faviconPngSizes = [192, 512]

export const GET: APIRoute = async () => {
  const icons = await Promise.all(
    faviconPngSizes.map(async (size) => {
      const image = await getImage({
        src: favicon,
        width: size,
        height: size,
        format: 'png'
      })
      return {
        src: image.src,
        type: `image/${image.options.format}`,
        sizes: `${image.options.width}x${image.options.height}`
      }
    })
  )

  const manifest = {
    name: 'Your site title',
    description: 'Your site description',
    start_url: '/',
    display: 'standalone',
    id: 'some-unique-id',
    icons
  }

  return new Response(JSON.stringify(manifest))
}
```

This will generate the manifest file into `/manifest.json` with additional favicon assets being created and referenced in the newly created manifest file.

The code above is written in TypeScript but you can use trusty old JavaScript by using a `.js` file ending and removing the `: APIRoute` type annotation.

With this, the `manifest.json` also has the minimally required keys to make your site installable as a [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app).

## Generating the Favicon.ico

> Don’t get smart with the static asset folder structure and cache busters.\
> [Evil Martians](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)

Yup, for legacy browsers we actually _need_ a `favicon.ico` at the site's root, hence the reference to `/favicon.ico` in the `head`.

The most simple way is to generate that ico file once with one of the many online or cli tools available, put it in `public/` and be done with it.

But to accomplish this without dealing with another source file and without having to worry about future favicon changes, we can make use of Astro's [Static File Endpoints](https://docs.astro.build/en/core-concepts/endpoints/) again to generate and deliver this asset under `/favicon.ico`.

As `sharp` does not support `ico` output by default, we have to use `sharp-ico`:

```bash
npm install sharp-ico
```

Astro uses [`sharp`](https://github.com/lovell/sharp) under the hood so it should be installed already but if you get errors, you might have to add it to your dependencies too.

Then use `sharp` and `sharp-ico` directly in `src/pages/favicon.ico.ts` to resize and generate the final `favicon.ico` from the source image:

```typescript title="src/pages/favicon.ico.ts"
import type { APIRoute } from 'astro'
import sharp from 'sharp'
import ico from 'sharp-ico'
import path from 'node:path'

// relative to project root
const faviconSrc = path.resolve('src/images/favicon.png')

export const GET: APIRoute = async () => {
  // resize to 32px PNG
  const buffer = await sharp(faviconSrc).resize(32).toFormat('png').toBuffer()
  // generate ico
  const icoBuffer = ico.encode([buffer])

  return new Response(icoBuffer, {
    headers: { 'Content-Type': 'image/x-icon' }
  })
}
```

Only one size in the final ico should be fine for most use cases. If you want to get more sizes into the final ico, you can pass more buffers to that array passed to `ico.encode()`:

```typescript title="src/pages/favicon.ico.ts"
const buffer32 = await sharp(faviconSrc).resize(32).toFormat('png').toBuffer()
const buffer16 = await sharp(faviconSrc).resize(16).toFormat('png').toBuffer()

ico.encode([buffer16, buffer32])
```

In the end, this will return our dynamically generated ico file under `/favicon.ico`.

We have to work around Astro's native asset handling here, I could not get `sharp` to work with `astro:assets` generated urls, or with the raw old `?url` import way. Which is why a Node.js native module `path` is used, which might lead to problems during SSR depending on your setup so be aware. Would love to know a way of passing Astro-generated image URLs so sharp understands them, if you know a way, do let me know!

## Conclusion

All the required favicon assets are now integrated in an Astro project, covering most modern browsers and devices. Make sure to look through all he other tidbits in the Evil Martian post and explore the Astro docs:

- [How to Favicon in 2023: Six files that fit most needs](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)
- [Astro: Static File Endpoints](https://docs.astro.build/en/core-concepts/endpoints/)
- [Astro: `getImage()`](https://docs.astro.build/en/guides/images/#generating-images-with-getimage)
