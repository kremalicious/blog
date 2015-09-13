---
layout: post

title: CSS App Store Badges
image: teaser-appstorebadges.png

author: Matthias Kretschmann
date: 2015-09-13 18:55:18.418548000 +02:00

category: goodies
tags:
    - css
    - svg
---

The badges provided by all app store providers just don't play well together with their varying typography and different sizing. Only Apple provides a proper SVG source for their badge, Google doesn’t even provide a retina bitmap asset.

On top of that, using svg or png assets makes localization a pain unless you want to manage multiple assets per language.

So let's make them all visually unified, infinitely scalable, with pure text for easier localization and some web interaction styles. And while we’re at it: different sizes with the same markup by using some modifier classes.

<!-- more -->

<p class="content-download">
    <a class="btn-primary icon-eye" href="https://lab.kremalicious.com/appstorebadges/">Demo</a>
    <a class="icon-github" href="https://github.com/kremalicious/appstorebadges/">GitHub</a>
    <a href="http://codepen.io/kremalicious/details/EVVraP/">Codepen</a>
</p>


# Styling

<style>
    @import 'https://rawgit.com/kremalicious/appstorebadges/master/dist/appstorebadges.min.css';
</style>

Let’s be honest, Google, Amazon & Microsoft created just slight variations of the badge style established by Apple’s App Store badge. So it’s only natural to unify all badges by leaning more to Apple’s style in terms of typography. Apple uses Myriad Pro in their original badge which isn’t available for free web usage.

So all buttons are just set in Apple’s San Francisco UI font with this funky font stack:

```css
.badge {
    font-family: system, -apple-system, '.SFNSDisplay-Regular', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}
```

The first three values are grabbing the system installed version on OS X & iOS, the `San Franciso` value shamelessly references the `@font-face` imported files from Apple’s S3 account and if all that fails, the badges fall back to either Helvetica or Arial.

Because of varying copy resulting in different badge widths, the only way to make them unified when they are stacked on top of each other, like in a mobile layout, was to make all of them the width of the widest one. This is [defined as a variable in the Stylus source](https://github.com/kremalicious/appstorebadges/blob/master/src/styl/_variables.styl#L12) and set as `min-height` so the badges can grow, like with bigger font sizes or because of localization.

Here's a live demo of the default sizes:

<a class="badge" href="#">
    <svg class="badge__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" viewBox="0 0 20 20">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5640259,13.8623047
c-0.4133301,0.9155273-0.6115723,1.3251343-1.1437988,2.1346436c-0.7424927,1.1303711-1.7894897,2.5380249-3.086853,2.5500488
c-1.1524048,0.0109253-1.4483032-0.749939-3.0129395-0.741333c-1.5640259,0.008606-1.8909302,0.755127-3.0438843,0.7442017
c-1.296814-0.0120239-2.2891235-1.2833252-3.0321655-2.4136963c-2.0770874-3.1607666-2.2941895-6.8709106-1.0131836-8.8428955
c0.9106445-1.4013062,2.3466187-2.2217407,3.6970215-2.2217407c1.375,0,2.239502,0.7539673,3.3761597,0.7539673
c1.1028442,0,1.7749023-0.755127,3.3641357-0.755127c1.201416,0,2.4744263,0.6542969,3.3816528,1.7846069
C14.0778809,8.4837646,14.5608521,12.7279663,17.5640259,13.8623047z M12.4625244,3.8076782
c0.5775146-0.741333,1.0163574-1.7880859,0.8571167-2.857666c-0.9436035,0.0653076-2.0470581,0.6651611-2.6912842,1.4477539	C10.0437012,3.107605,9.56073,4.1605835,9.7486572,5.1849365C10.7787476,5.2164917,11.8443604,4.6011963,12.4625244,3.8076782z"/>
    </svg>
    <span class="badge__text">Download on the</span>
    <span class="badge__storename">App Store</span>
</a>
<a class="badge" href="#">
    <svg class="badge__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" viewBox="0 0 20 20">
        <path d="M4.942627,18.0508423l7.6660156-4.3273926l-1.6452026-1.8234253L4.942627,18.0508423z M2.1422119,2.1231079
C2.0543823,2.281311,2,2.4631958,2,2.664917v15.1259766c0,0.2799683,0.1046143,0.5202026,0.2631226,0.710144l7.6265259-7.7912598
L2.1422119,2.1231079z M17.4795532,9.4819336l-2.6724854-1.508606l-2.72229,2.7811279l1.9516602,2.1630249l3.4431152-1.9436035
C17.7927856,10.8155518,17.9656372,10.5287476,18,10.2279053C17.9656372,9.927063,17.7927856,9.6402588,17.4795532,9.4819336z
 M13.3649292,7.1592407L4.1452026,1.954834l6.8656616,7.609314L13.3649292,7.1592407z"/>
    </svg>
    <span class="badge__text">Get it on</span>
    <span class="badge__storename">Google Play</span>
</a>
<a class="badge" href="#">
    <svg class="badge__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" viewBox="-410 288.3 20 20">
    <path d="M-392.5,305.3c-0.1,0.1-0.2,0.1-0.4,0.2c-0.2,0-0.4-0.2-0.3-0.4c0.1-0.4,0.3-0.7,0.4-1.1c0.1-0.2,0.1-0.4,0.1-0.6
    c0-0.1,0-0.2-0.2-0.2c-0.4,0-0.7,0-1.1,0c-0.2,0-0.5,0.1-0.7,0.1c-0.2,0-0.3,0-0.4-0.2c-0.1-0.2,0-0.3,0.1-0.4
    c0.2-0.2,0.5-0.3,0.8-0.4c0.4-0.2,0.9-0.2,1.4-0.2c0.3,0,0.6,0.1,0.9,0.1c0.3,0.1,0.5,0.2,0.5,0.6
    C-391.4,303.6-391.7,304.5-392.5,305.3z M-396.8,301.9c-0.2,0.2-0.5,0.2-0.7,0c-0.4-0.3-0.7-0.7-0.9-1.1c-0.1-0.1-0.1-0.2-0.2-0.3
    c-0.2,0.2-0.4,0.3-0.5,0.5c-0.8,0.8-1.8,1.1-2.9,1.1c-0.5,0-1,0-1.5-0.2c-0.9-0.4-1.5-1-1.7-2c-0.2-0.8-0.2-1.7,0-2.5
    c0.3-1,1-1.7,1.9-2.1c0.7-0.4,1.5-0.6,2.3-0.7c0.6-0.1,1.3-0.1,1.9-0.2c0.1,0,0.2,0,0.1-0.1c0-0.4,0-0.8-0.1-1.2
    c-0.1-0.7-0.5-1.1-1.1-1.2c-0.7-0.1-1.3,0.1-1.8,0.6c-0.2,0.2-0.3,0.4-0.3,0.7c-0.1,0.4-0.2,0.5-0.6,0.4c-0.6-0.1-1.2-0.2-1.8-0.2
    c-0.3,0-0.4-0.2-0.4-0.5c0.3-1.5,1.2-2.5,2.6-3c1.2-0.5,3.1-0.3,3.4-0.3c0.7,0.1,1.4,0.4,2,0.8c0.7,0.5,1.1,1.2,1.1,2.1
    c0,0.5,0,1,0,1.5c0,1.2,0,2.4,0,3.6c0,0.8,0.2,1.4,0.7,2c0.1,0.1,0.1,0.2,0.2,0.3c0.1,0.2,0.1,0.4-0.1,0.5
    C-395.7,301-396.3,301.5-396.8,301.9z M-399.3,296.1c-0.4,0-0.8,0-1.2,0.1c-1.4,0.2-2.1,1.2-1.9,2.6c0.1,0.9,0.9,1.4,1.8,1.1
    c0.6-0.2,1-0.7,1.3-1.3c0.2-0.6,0.2-1.1,0.2-1.7c0-0.2,0-0.3,0-0.5C-399,296.2-399.1,296.1-399.3,296.1z M-399.4,305.1
    c1.8-0.2,3.5-0.7,5.2-1.4c0.1,0,0.2-0.1,0.3-0.1c0.2,0,0.4,0.1,0.5,0.3c0.1,0.2,0,0.4-0.2,0.6c-0.4,0.3-0.8,0.6-1.2,0.8
    c-1.4,0.8-2.8,1.3-4.4,1.5c-0.5,0.1-1,0.1-1.4,0.1c-1.8,0-3.4-0.6-4.9-1.5c-1.1-0.6-2-1.4-2.9-2.2c-0.2-0.2-0.2-0.4-0.1-0.6
    c0.1-0.2,0.4-0.2,0.6-0.1c0.4,0.2,0.8,0.5,1.3,0.7c1.2,0.7,2.5,1.3,3.9,1.6C-401.7,305.1-400.5,305.2-399.4,305.1z"/>
    </svg>
    <span class="badge__text">Available at</span>
    <span class="badge__storename">Amazon</span>
</a>
<a class="badge" href="#">
    <svg class="badge__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" viewBox="0 0 20 20">
        <path d="M9.5,3.2410278V9.5H18V2L9.5,3.2410278z M2,9.5h6.5V3.3870239L2,4.3359985V9.5z M9.5,16.7589722L18,18v-7.5H9.5V16.7589722z
M2,15.6640015l6.5,0.9489746V10.5H2V15.6640015z"/>
    </svg>
    <span class="badge__text">Download from</span>
    <span class="badge__storename">Windows Store</span>
</a>

# Usage

Install with npm:

```bash
npm i appstorebadges --save
```

Or install with Bower:

```bash
bower install appstorebadges --save
```

Or just directly link to the css file in the [GitHub repo](https://github.com/kremalicious/appstorebadges):

```html
<link rel="stylesheet" href="https://rawgit.com/kremalicious/appstorebadges/master/dist/appstorebadges.min.css">
```

## HTML Markup

This is the basic markup for all badges:

```html
<a class="badge" href="#">
    <svg class="badge__icon">[…]</svg>
    <span class="badge__text">Download on the</span>
    <span class="badge__storename">App Store</span>
</a>
```

yielding in, here the iOS badge:

<a class="badge" href="#">
    <svg class="badge__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" viewBox="0 0 20 20">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5640259,13.8623047
c-0.4133301,0.9155273-0.6115723,1.3251343-1.1437988,2.1346436c-0.7424927,1.1303711-1.7894897,2.5380249-3.086853,2.5500488
c-1.1524048,0.0109253-1.4483032-0.749939-3.0129395-0.741333c-1.5640259,0.008606-1.8909302,0.755127-3.0438843,0.7442017
c-1.296814-0.0120239-2.2891235-1.2833252-3.0321655-2.4136963c-2.0770874-3.1607666-2.2941895-6.8709106-1.0131836-8.8428955
c0.9106445-1.4013062,2.3466187-2.2217407,3.6970215-2.2217407c1.375,0,2.239502,0.7539673,3.3761597,0.7539673
c1.1028442,0,1.7749023-0.755127,3.3641357-0.755127c1.201416,0,2.4744263,0.6542969,3.3816528,1.7846069
C14.0778809,8.4837646,14.5608521,12.7279663,17.5640259,13.8623047z M12.4625244,3.8076782
c0.5775146-0.741333,1.0163574-1.7880859,0.8571167-2.857666c-0.9436035,0.0653076-2.0470581,0.6651611-2.6912842,1.4477539	C10.0437012,3.107605,9.56073,4.1605835,9.7486572,5.1849365C10.7787476,5.2164917,11.8443604,4.6011963,12.4625244,3.8076782z"/>
    </svg>
    <span class="badge__text">Download on the</span>
    <span class="badge__storename">App Store</span>
</a>

Only the icon and the copy change for each badge. To be able to style modify all colors, including the icon color easily with one variable change, using the SVG assets as `background-image` within `:before` or `:after` content wasn't feasible. So inline SVG it is, which allows easy styling via CSS.

For maximum browser compatibility and simplicity, I just inlined the icon assets in all markup blocks. In a production environment you should create a sprite from them, reference them with the SVG `use` element and polyfill with [svg4everybody](https://github.com/jonathantneal/svg4everybody).

## Size Variations

Just drop those modifier classes on the `badge` base element:

- `badge--small`
- `badge--tiny`
