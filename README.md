kremalicious3
==================

> [kremalicious.com](http://kremalicious.com) based on [Jekyll](http://jekyllrb.com). Neat.

[ ![Codeship Status for kremalicious/kremalicious3](https://www.codeship.io/projects/f6973090-9f04-0131-a2b7-625e8177ce9a/status?branch=master)](https://www.codeship.io/projects/18092) [![Dependency Status](https://www.versioneye.com/user/projects/53bbe331e1d158724400002e/badge.svg?style=flat)](https://www.versioneye.com/user/projects/53bbe331e1d158724400002e)

Requirements
------------------

You need to have the following tools installed on your development machine before moving on:

- [node.js](http://nodejs.org/) & [npm](https://npmjs.org/)
- [Bower](http://bower.io/)
- [Ruby](https://www.ruby-lang.org) (for sanity, install with [rvm](https://rvm.io/)) and [Bundler](http://bundler.io/)


Get up and running
------------------

For various reasons the assets build process and Jekyll site generation is managed through Grunt instead of `jekyll` or `rake`.

Both, `grunt server` and `grunt build`, use [grunt-jekyll](https://github.com/dannygarcia/grunt-jekyll) to first generate the site into the `_site` folder and the following Grunt tasks output into that folder. The build task copies everything over into the `_build`folder.

The `media` folder holding the source post images is excluded from Jekyll site generation and rsynced around from `_src/_media` to `_site/media` before site generation starts.

Image size generation for post teaser images and photos is done with [jekyll-picture-tag](https://github.com/robwierzbowski/jekyll-picture-tag), putting resized images into `_site/media/gen`.

### Install dependencies

Run the following command from the repository's root folder to install all dependencies.

```bash
npm install && bower install && bundle install
```

### Development build

This generates the site and assets with some Jekyll development options and starts a local dev server combined with a livereloading watch task under `http://localhost:1337`.

**[jekyll-picture-tag](https://github.com/robwierzbowski/jekyll-picture-tag) makes site generation very slow at the moment.** During development, uncommenting [some lines](https://github.com/kremalicious/kremalicious3/blob/master/_src/_plugins/picture_tag.rb#L142-L144) in that plugin's file speeds up regeneration dramatically. Seriously, from like 10 min. to 10 sec. Downside: no teaser images or photos in the development build.

```bash
grunt server
```

### Production build

Runs almost the same tasks as `grunt server` but puts everything into the `_build` directory, versions all assets and optimizes all image assets.

```bash
grunt build
```


Licenses
------------------

### Posts

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a><br />All post content under `_src/_posts` is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

### Photos & images

All photos & image assets under `_src/_media`, `_src/assets/img`, and `assets sheet.psd` are plain ol' copyright.

Copyright (c) 2008–2014 Matthias Kretschmann

Don't care if you fork & play with it, but you're not allowed to publish anything from it as a whole without my written permission.

### Everything else

The MIT License (MIT)

Copyright (c) 2008–2014 Matthias Kretschmann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.