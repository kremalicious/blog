---
type: post

title: Using <kbd> for fun and profit
image: ./kremalicious-kbdfun-teaser.png
style: ./post-kbd.css
author: Matthias Kretschmann
featured: true

date: 2012-07-16 14:36:58+00:00
category: design
tags:
    - css

coinhive: true
---

<style>
    @import './post-kbd.css';
</style>

There's this HTML element meant for marking up keyboard keys named `<kbd>`. Obviously it can be styled with CSS so why not use it to make those elements look a bit more like hardware or the iOS and Android software keys.

The above picture might be blurry depending on the device you're using so here's a live rendered demo:

<kbd>Light</kbd> <kbd class="dark">Dark</kbd> <kbd class="ios">iOS</kbd> <kbd class="android">An</kbd> <kbd class="android dark">dro</kbd> <kbd class="android color">id</kbd>

They are completely styled with CSS3 so they're sharp on all screens no matter how high the dpi. Have a look at the [full demo](http://lab.kremalicious.com/kbdfun/) or grab the project folder with the CSS & LESS files from GitHub. The code is under the MIT license so you're free to use it in any personal or commercial project.

<p class="content-download">
    <a class="btn-primary icon-eye" href="http://lab.kremalicious.com/kbdfun/">Demo</a>
    <a class="icon-github" href="https://github.com/kremalicious/kbdfun/">Github</a>
</p>

## Usage


### CSS

Just drop in the `kbdftw.css` in your `head`:

```html
<link rel="stylesheet" href="kbdfun.css">
```

If you want to use the Android key style, include roboto.css before:

```html
<link rel="stylesheet" href="roboto.css">
<link rel="stylesheet" href="kbdfun.css">
```

You also need to add all the Roboto font files from assets/fonts to your project.

### LESS

There're some variables in the `kbdfun.less` file you can customize.

For the Android style, there's `roboto.less` as include at the end. But the font files won't load unless you uncomment the `.font-roboto` line in kbdftw.less. This is to make sure, users won't download all the font files if you don't use the Android style.

### Markup

The default styling are light keys with Lucida Grande as font:

```html
<kbd>Q</kbd>
```
becomes <kbd>Q</kbd>

Add a dark class to get the dark keys:

```html
<kbd class="dark">Q</kbd>
```
becomes <kbd class="dark">Q</kbd>

Adding an ios or android class gives a replica of those system keys. Android uses three different colors on the default keyboard.

```html
<kbd class="ios">Q</kbd>
```
becomes <kbd class="ios">Q</kbd>

```html
<kbd class="android">Q</kbd>
```
becomes <kbd class="android">Q</kbd>

```html
<kbd class="android dark">Q</kbd>
```
becomes <kbd class="android dark">Q</kbd>

```html
<kbd class="android color">Q</kbd>
```
becomes <kbd class="android color">Q</kbd>

I've let the default `display: inline` intact so all padding on the `kbd` elements won't affect the line-height of the surrounding text. This leads to problems when you want to use them over multiple lines so just make them `display: inline-block` in this scenario.

Pro Tip: if you want to replicate all Mac keyboards after 2003 you have to get VAG rounded for the font.
