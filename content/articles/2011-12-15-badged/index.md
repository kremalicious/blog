---
title: Badged - iOS Style Notification Badges for WordPress
image: ./Badged-Teaser-kremalicious.png
updated: 2014-10-11 07:56:46+00:00

date: 2011-12-15 07:56:46+00:00

tags:
  - goodies
  - wordpress
  - ios
---

Made a quick WordPress plugin which transforms the standard WordPress update & comment notification badges into iOS-styled ones.

Badged transforms the standard WordPress update & comment notification badges into iOS-styled ones. Upon activation it automatically replaces the badge styles in the admin menu and the admin bar. An optional settings page allows to control whether the badges show up as the new default iOS style or styled as pre-iOS 7 badges.

The badges are CSS only (box shadows, gradients, pseudo elements, you name it) and were tested in current versions of Safari, Chrome, Firefox and Internet Explorer. If you care for how it’s done exactly, you can peek around in the [repository on github](https://github.com/kremalicious/Badged/).

The plugin is localized in english, german & spanish (thanks to Andrew Kurtis from [webhostinghub.com](http://www.webhostinghub.com)).

## Download & Installation

You can just install the plugin via the automatic backend installer under _Plugins > Add New_, activate and enjoy the red badges.

<p class="content-download">
<a href="http://wordpress.org/extend/plugins/badged" class="btn btn-primary icon-wordpress">Plugin Page</a> <a class="btn btn-primary icon-github" href="https://github.com/kremalicious/Badged">GitHub</a> <a href="http://krlc.us/givecoffee" class="icon-heart btn">Donate</a>
</p>

The plugin is hosted on GitHub and will always be mirrored in the WordPress plugins directory. But in case you want to install the plugin manually:

1. Upload the badged plugin folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the _Plugins_ menu in WordPress
3. Enjoy
4. (optional) Adjust options under _Settings > Badged_. Upon activation the plugin sets both options by default:

![Badged settings](./badged-settings.png)

If you find any problems you can [open an issue on GitHub](https://github.com/kremalicious/Badged/issues) or just drop me a line in the comments or on [Twitter](http://twitter.com/kremalicious).

## Version History

### v1.0.1

- tested for WP 4.0
- Spanish translation, muchas gracias to Andrew Kurtis from [webhostinghub.com](http://www.webhostinghub.com)
- don't style comments badge with 0 comments
- improved styles
- admin settings page fixes
- plugin icon and updated banner & screenshots

### v1.0.0

- new default style based on iOS 7
- new setting to switch back to pre-iOS 7 style
- rewritten from the ground up based on Tom McFarlin’s excellent WordPress Plugin Boilerplate
- settings through WordPress Settings API
- Retina banner for WordPress plugin repository listing
- drop IE 8 support (still present in pre-iOS 7 style)
- using Grunt for optimized images and minified css
- confusing and ridiculous version number jump

### v0.3.6

- tested for WP 3.4
- settings page: Retina ready icon for high dpi devices, css only submit button
- updated german translation

### v0.3.5

- IE 8 improvements: box shadow, light gradient through DXImageTransform filters (but no rounded corners, sorry)
- current versions of IE & Opera are now among the tested browsers
- updated settings page links

### v0.3.4

- more descriptive readme and settings footer with links to blog post & github page
- updated translation

### v0.3.2

- Make the plugin work if symlinked

### v0.3

- initial beta release

### v0.2

- added options to control whether the badges show up in admin menu or toolbar (default is both)

### v0.1

- initial alpha release
