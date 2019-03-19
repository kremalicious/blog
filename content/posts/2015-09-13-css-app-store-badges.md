---
type: post

title: CSS App Store Badges
image: ../media/teaser-appstorebadges.png

author: Matthias Kretschmann
date: 2015-09-13 18:55:18.418548000 +02:00

tags:
- goodies
- css
- svg
---

The badges provided by all app store providers just don't play well together with their varying typography and different sizing. So let's make them all visually unified, infinitely scalable, with pure text for easier localization and some web interaction styles. And while we’re at it: different sizes with the same markup by using some modifier classes.

<p class="content-download">
    <a class="btn-primary icon-eye" href="https://lab.kremalicious.com/appstorebadges/">Demo</a>
    <a class="icon-github" href="https://github.com/kremalicious/appstorebadges/">GitHub</a>
    <a href="http://codepen.io/kremalicious/details/EVVraP/">Codepen</a>
</p>

## Styling

Let’s be honest, Google, Amazon & Microsoft created just slight variations of the badge style established by Apple’s App Store badge. So it’s only natural to unify all badges by leaning more to Apple’s style in terms of typography. Apple uses Myriad Pro in their original badge which isn’t available for free web usage.

So all buttons are just set in Apple’s San Francisco UI font with this funky font stack:

```css
.badge {
    font-family: system, -apple-system, '.SFNSDisplay-Regular', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}
```

The first three values are grabbing the system installed version on OS X & iOS, the `San Franciso` value shamelessly references the `@font-face` imported files from Apple’s S3 account and if all that fails, the badges fall back to either Helvetica or Arial.

Because of varying copy resulting in different badge widths, the only way to make them unified when they are stacked on top of each other, like in a mobile layout, was to make all of them the width of the widest one. This is [defined as a variable in the Stylus source](https://github.com/kremalicious/appstorebadges/blob/master/src/styl/_variables.styl#L12) and set as `min-height` so the badges can grow, like with bigger font sizes or because of localization.

## Usage

Install with npm:

```shell
npm i appstorebadges --save
```

Or install with Bower:

```shell
bower install appstorebadges --save
```

Or just directly link to the css file in the [GitHub repo](https://github.com/kremalicious/appstorebadges):

```html
<link rel="stylesheet" href="https://rawgit.com/kremalicious/appstorebadges/master/dist/appstorebadges.min.css">
```

### HTML Markup

This is the basic markup for all badges:

```html
<a class="badge" href="#">
    <svg class="badge__icon">[…]</svg>
    <span class="badge__text">Download on the</span>
    <span class="badge__storename">App Store</span>
</a>
```

Only the icon and the copy change for each badge. To be able to style modify all colors, including the icon color easily with one variable change, using the SVG assets as `background-image` within `:before` or `:after` content wasn't feasible. So inline SVG it is, which allows easy styling via CSS.

For maximum browser compatibility and simplicity, I just inlined the icon assets in all markup blocks. In a production environment you should create a sprite from them, reference them with the SVG `use` element and polyfill with [svg4everybody](https://github.com/jonathantneal/svg4everybody).

### Size Variations

Just drop those modifier classes on the `badge` base element:

- `badge--small`
- `badge--tiny`
