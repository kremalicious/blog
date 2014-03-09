kremalicious3
==================

> [kremalicious.com](http://kremalicious.com) based on [Jekyll](http://jekyllrb.com). Neat.

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

Image size generation for post teaser images and photos is done with [grunt-responsive-images](https://github.com/andismith/grunt-responsive-images), putting resized images into `_site/media/_[sizename]`.

### Install dependencies

Run the following command from the repository's root folder to install all dependencies.

```bash 
npm install && bower install && bundle install
```

### Development build

This generates the site and assets with some Jekyll development options and starts a local dev server combined with a livereloading watch task under `http://localhost:1337`.


```bash
grunt server
```

### Production build

Runs almost the same tasks as `grunt server` but puts everything into the `_build` directory, versions all assets and optimizes all image assets.

```bash
grunt build
```
