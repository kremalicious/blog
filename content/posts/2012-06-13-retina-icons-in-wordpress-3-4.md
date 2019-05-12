---
type: post

title: Retina icons in WordPress 3.4
image: ../media/wp34_retina_icons.png

date: 2012-06-13 19:01:20+00:00

tags:
  - design
  - wordpress
---

Apart from a nicely responsive admin area, WordPress 3.4 now [includes retina assets](http://core.trac.wordpress.org/ticket/20293) for all the icons in the admin area to make them look crisp on devices with high-dpi screens like the iPhone or iPad 3, most flagship Android devices and of course the new ÜberMacBookPro.

So if you're a plugin developer you absolutely want to make sure to include retina assets for your plugin, like a double sized admin menu icon.

There's just one problem: WordPress doesn't include anything to make this easy for developers. The functions `register_post_type()` and `add_menu_page()` only allow you to define one image as menu icon which then gets inserted as `img` tag.

![kremalicious-Teaser-WP-Icon-Template](../media/kremalicious-Teaser-WP-Icon-Template.png)

If you want to include retina assets, you have to do it via CSS and media queries. Have a look at the code examples in my [WordPress icons template post](/wp-icons-template/) or peek around in the [github repository](https://github.com/kremalicious/wp-icons-template) to see how this can be achieved.

And no, [SVG for your icons are not the solution](http://www.pushing-pixels.org/2011/11/04/about-those-vector-icons.html).
