kremalicious3
==================

> [kremalicious.com](http://kremalicious.com) based on [Jekyll](http://jekyllrb.com). Neat.

[![Build Status](https://travis-ci.org/kremalicious/kremalicious3.svg?branch=master)](https://travis-ci.org/kremalicious/kremalicious3)
[![Greenkeeper badge](https://badges.greenkeeper.io/kremalicious/kremalicious3.svg)](https://greenkeeper.io/)


Requirements
------------------

You need to have the following tools installed on your development machine before moving on:

- [node.js](http://nodejs.org/) & [npm](https://npmjs.org/)
- [Ruby](https://www.ruby-lang.org) (for sanity, install with [rvm](https://rvm.io/)) and [Bundler](http://bundler.io/)


Content Creation
------------------

Some handy rake tasks creating the correct front matter for each content type:

New Content | Command
----------- | -----------
Post        | `rake post -- Title`
Photo       | `rake photo -- Title`
Link        | `rake link -- Title`


Get up and running
------------------


### Install dependencies

Run the following command from the repository's root folder to install all dependencies.

```bash
npm install && bundle install
```

### Development server

This generates the site with the dev build task `gulp build` and starts a local dev server combined with a livereloading watch task under `http://localhost:1337`.

```bash
gulp
```

### Production build

```bash
gulp build --production
```


Licenses
------------------

### Posts

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a><br />All post content under `_src/_posts` is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

### Photos & images

All photos & image assets under `_src/_media`, `_src/assets/img`, and `assets sheet.psd` are plain ol' copyright.

Copyright (c) 2008–2017 Matthias Kretschmann

Don't care if you fork & play with it, but you're not allowed to publish anything from it as a whole without my written permission.

### Everything else

The MIT License (MIT)
