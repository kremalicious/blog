---
type: post

title: WebKit team introduces CSS-based gradients
author: Matthias Kretschmann

date: 2008-04-15 17:36:34+00:00

tags:
  - design
  - css
---

![WebKit](../media/webkit.png)

Writing right now on a longer article about text-shadow and it's implementation in WebKit, the rendering engine which powers Safari and Konqueror. But now this exciting news popped up from Surfin' Safari, the blog of the WebKit development team:

<!-- more -->

> WebKit now supports gradients specified in CSS. There are two types of gradients: linear gradients and radial gradients.

Take a look at [the entry on Surfin' Safari to learn how those css-based gradients work and how they can be coded](http://webkit.org/blog/175/introducing-css-gradients/):

> So what exactly is a gradient in CSS? It is an image, usable anywhere that image URLs were used before. That’s right… anywhere.
>
> You can use gradients in the following places:
> background-image
> border-image
> list-style-image
> content property

Although the WebKit team is saying it is supported "now" [a commenter on Surfin' Safari states](http://webkit.org/blog/175/introducing-css-gradients/#comment-24343) that it seems the whole function isn't included in the latest nightly builds of WebKit.

So it will take some time, 'til it's worth replacing the gradient images on my h3 and h4 headlines with just simple css code...
