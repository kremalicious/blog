---
date: 2023-09-12T11:30:30.691Z

title: Favicon Generation with Astro
image: ./favicon-generation-with-astro-teaser.png

tags:
  - development
  - favicon
  - astro

draft: true
---

Favicons are those small but impactful icons displayed next to a website's title in a browser tab. While they may seem like a minor detail, implementing favicons involves various considerations for different formats and sizes to fit a range of devices and browsers. Luckily, we can always count on [Evil Martians](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs) to tell us which files are actually needed in modern times.

This article outlines how to implement just that with Astro.js, utilizing its Static File Endpoints and [`getImage()`](https://docs.astro.build/en/guides/images/#generating-images-with-getimage) function to generate multiple favicon sizes without any other tools, as it uses [`sharp`](https://github.com/lovell/sharp) under the hood.

This procedure assumes you are fine with all sizes being generated from one big size. If you require more control e.g. over the smaller sizes you can use the following walkthrough as a starting point.

## Why Not Just Add Images to `public/` Manually?

You might wonder why there's a need for a dynamic approach when these images could simply be added to the `public/` directory manually. One significant advantage of generating favicons dynamically is cache busting. When you update your favicon, browsers might still serve the old one from cache, confusing your users and diluting your branding. By generating favicons dynamically, you can ensure that the latest version is served, as, if they have changed, each build will create new, uniquely named files that bypass the cache.

If you're fine with never changing your favicon assets, the most simple approach would be to generate all files manually into the `public/` folder, including the `manifest.json`. And then reference them with their absolute path in your `head` as described further down, skipping the dynamic image generation and manifest creation.

## Project Structure

To begin, these are the only source files we will deal with:

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

- `src/images/`: Housing the original favicon images. `favicon.png` is a large-sized image (512px) that will be resized dynamically, whereas `favicon.svg` is an SVG file that adapts to the user's light or dark mode settings.
- `src/layouts/index.astro`: This can be any layout template that contains your HTML `head` content, as we will add the links to the favicons and the manifest file in there.
- `src/pages/manifest.json.ts`: This is an Astro Static File Endpoint that dynamically generates the `/manifest.json` file, referencing the generated favicons. This file uses Astro's `getImage()` function to create various sizes of PNG icons from a single source image, and then includes these in the generated manifest.

### Final Generated Files

After building the project, the generated favicon files will be placed in the `/_astro/` directory with dynamic filenames, and correctly referenced in your `head` and `/manifest.json`. This happens automatically during the production build, so there's no need to keep track of these filenames manually.

## Generating the Web Manifest Using Astro's Static File Endpoints

In this setup, the [manifest file](https://developer.mozilla.org/en-US/docs/Web/Manifest) is dynamically generated using Astro's [Static File Endpoints feature](https://docs.astro.build/en/core-concepts/endpoints/).

Add the following code to `src/pages/manifest.json.ts`:

```typescript
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
    description: 'Your site's description',
    start_url: '/',
    display: 'standalone',
    id: 'some-unique-id',
    icons
  }

  return new Response(JSON.stringify(manifest))
}
```

This is written in TypeScript but you can use trusty old JavaScript by using a `.js` file ending and removing the `: APIRoute` type annotation.

With this, the `manifest.json` also has the minimally required keys to make your site installable as a [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app).

## Adding Favicons to the `head`

To reference the manifest file and to generate more favicon sizes, we will have to update the `head` section of your site.

In this example, we do this in a `src/layouts/index.astro` file, assuming this is then used as a layout in of your `src/pages/` files. Do this wherever your `head` info gets populated in your site.

In this example layout file `src/layouts/index.astro`, let's add:

```astro
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

Astro's `getImage()` function is used to generate an Apple Touch Icon (180x180 PNG) on build time for static builds, or during SSR.

The SVG favicon is not generated anew but is essentially passed through the `getImage()` function to benefit from cache busting, ensuring that the most up-to-date version is served for this file too.

## Favicon.ico in Site Root

> Don’t get smart with the static asset folder structure and cache busters.\
> [Evil Martians](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)

Yup, for legacy browsers we actually need a `favicon.ico` at the site's root, hence the reference to `/favicon.ico` in the `head`.

The most simple way is to generate that ico once in one of the many tools available for it, put in `public/` and be done with it.

But to accomplish this without dealing with another source file and don't worry about icon changes, we can make use of Astro's Static File Endpoints again to generate and deliver this asset under `/favicon.ico` in your final build.

As `sharp` does not support `ico` output by default, we have to use `sharp-ico`.

Install it first:

```bash
npm install sharp-ico
```

Then use `sharp` and `sharp-ico` directly in `src/pages/favicon.ico.ts` to resize and generate the final `favicon.ico` from the source image:

```typescript
import type { APIRoute } from 'astro'
import sharp from 'sharp'
import ico from 'sharp-ico'
import path from 'node:path'

// relative to project root
const faviconSrc = path.resolve('src/images/favicon.png')

export const GET: APIRoute = async () => {
  const buffer = await sharp(faviconSrc).resize(32).toFormat('png').toBuffer()
  const icoBuffer = ico.encode([buffer])

  return new Response(icoBuffer, {
    headers: { 'Content-Type': 'image/x-icon' }
  })
}

```

We have to work around Astro's native asset handling as I could not get `sharp` to work either with `astro:assets` urls, nor with the raw old `?url` import way. Which is why `path` is used, which might lead to problems during SSR depending on your setup. Would love to know a way of passing Astro-generated image URLs so sharp understands them, if you know a way, do let me know! 

In the end, this will return our dynamically generated ico file under `/favicon.ico`.

## Conclusion

This setup successfully implements favicons in an Astro.js project, covering most modern browsers and devices. By taking advantage of Astro's asset handling capabilities, particularly the `getImage` function and Static File Endpoints feature, managing and optimizing favicons becomes a straightforward task. The dynamic generation also aids in cache busting, ensuring that users always see the most up-to-date icons.
