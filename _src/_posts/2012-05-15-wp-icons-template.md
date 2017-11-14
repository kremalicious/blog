---
layout: post

title: WordPress Admin Icons Template
image: kremalicious-Teaser-WP-Icon-Template.png
author: Matthias Kretschmann

date: 2012-05-15 16:00:44+00:00
wordpress_id: 2043

categories:
    - design
    - goodies
tags:
    - boilerplate
    - tutorial
    - wordpress

coinhive: true

redirect_from:
    - /2012/05/wp-icons-template/
---

Here’s a template for designing your own icons for the admin area of WordPress including icons ready for Retina screens and some recommendations for the workflow of implementing these.

There are basically two scenarios where you really need custom icons for WordPress’ admin area: when creating custom post types and when creating option pages for a plugin/theme. No matter what case, at least 3 icons are needed if you want to get it right:

  * two 16px icons for the admin menu, one non-colored and one colored icon for the hover state
  * one 32px icon for the actual screen

And since the admin area gets constantly optimized for devices which happen to have high-dpi screens (like 3rd generation iPad’s Retina screen) it’s a very good idea to include double sized @2x assets for all the icons mentioned above.

So if you value quality and want pixel perfect icons in your admin area you need to create a total of 6 icon sizes.

## The Template

![](/media/WordPress-Admin-Icons-Template-Filled.png)

I’ve put the template along with the implementation examples from the next section on [github](https://github.com/kremalicious/wp-icons-template). You can just download the whole package right away:

<p class="content-download">
    <a href="https://github.com/kremalicious/wp-icons-template/zipball/master" class="btn-primary icon-download">Download</a> <a href="https://github.com/kremalicious/wp-icons-template" class="icon-github">GitHub</a> <a href="http://krlc.us/givecoffee" class="icon-heart">Donate</a>
</p>

### Usage

The psd file in there has room for all the icon sizes mentioned above. As you can see, I’ve added an umbrella icon to better illustrate the various sizes. Turn on the “Icon Frames - White” layer to see the dimensions for each icon.

Additionally, I’ve added two shapes with base layer styles which resemble the default admin icon style. This is by no means a magic bullet to make every shape look exactly like a WordPress default icon. It’s just a starting point from where you can modify it for your own needs.

And because consistency is key, the default WordPress admin icon sprites are included as hidden layers for reference. Turn them on to make sure your own icon doesn’t look out of place.

The psd is sliced for multiple sprites. You’re of course encouraged to make only one sprite out of it, this just made it more universal for the following code examples. When you’re finished designing the icons just hide the background layers and use Save for Web in Photoshop to export the sliced areas. Running them through ImageOptim or something like that afterwards is a good idea.

## Implementation, or: Ignore The Codex

While `register_post_type()` and `add_menu_page()` let you define a URL for an icon this doesn’t allow for controlling hover or @2x assets. That’s because this will put the icon as an `img` element into the menu as opposed to the icons for the built-in items (they’re css background images from sprites). Furthermore, WordPress will add a default opacity to all img elements in the admin menu, with 100% opacity only on hover.

So when using this template with all those icons, I suggest you use the following snippets in your functions.php instead. Yes, I’m telling you to ignore the codex. But this is the only way to get what we want:

  * hover state consistent to WordPress default menu behavior
  * control the display of the various image sizes for high-dpi devices with css media queries

So the following code just injects a stylesheet snippet into the `<head>` of all admin pages. This is a modification of [Randy Jensen’s code idea](http://randyjensenonline.com/thoughts/wordpress-custom-post-type-fugue-icons/).

You can always refer to the inline commented versions of these snippets in the [github repository](https://github.com/kremalicious/wp-icons-template).

### Custom Post Type Icons

WordPress automatically puts an ID around your new menu item which contains the name of your custom post type (the $post_type parameter in `register_post_type()`). Just change this to your own post type name:

{% highlight php %}

<?php
/**
 * Custom Post Type Icon for Admin Menu & Post Screen
 */
add_action( 'admin_head', 'custom_post_type_icon' );

function custom_post_type_icon() {
    ?>
    <style>
        /* Admin Menu - 16px */
        #menu-posts-YOUR_POSTTYPE_NAME .wp-menu-image {
            background: url(<?php bloginfo('template_url') ?>/images/icon-adminmenu16-sprite.png) no-repeat 6px 6px !important;
        }
        #menu-posts-YOUR_POSTTYPE_NAME:hover .wp-menu-image, #menu-posts-YOUR_POSTTYPE_NAME.wp-has-current-submenu .wp-menu-image {
            background-position: 6px -26px !important;
        }
        /* Post Screen - 32px */
        .icon32-posts-YOUR_POSTTYPE_NAME {
            background: url(<?php bloginfo('template_url') ?>/images/icon-adminpage32.png) no-repeat left top !important;
        }
        @media
        only screen and (-webkit-min-device-pixel-ratio: 1.5),
        only screen and (   min--moz-device-pixel-ratio: 1.5),
        only screen and (     -o-min-device-pixel-ratio: 3/2),
        only screen and (        min-device-pixel-ratio: 1.5),
        only screen and (                min-resolution: 1.5dppx) {

            /* Admin Menu - 16px @2x */
            #menu-posts-YOUR_POSTTYPE_NAME .wp-menu-image {
                background-image: url('<?php bloginfo('template_url') ?>/images/icon-adminmenu16-sprite_2x.png') !important;
                -webkit-background-size: 16px 48px;
                -moz-background-size: 16px 48px;
                background-size: 16px 48px;
            }
            /* Post Screen - 32px @2x */
            .icon32-posts-YOUR_POSTTYPE_NAME {
                background-image: url('<?php bloginfo('template_url') ?>/images/icon-adminpage32_2x.png') !important;
                -webkit-background-size: 32px 32px;
                -moz-background-size: 32px 32px;
                background-size: 32px 32px;
            }
        }
    </style>
<?php }

?>

{% endhighlight %}

### Plugin And Theme Options Icons

The easiest way is to just use this markup on your option page before the page heading which is the default on all admin pages:

{% highlight html %}<div id="PLUGINNAME" class="icon32"></div>
<h2>My cool option page</h2>{% endhighlight %}

This is the markup being addressed in the snippet block for option page icons. The `icon32` class will make sure everything is aligned consistent to all other pages without redefining everything in css.

But since you control the whole markup of an option page there's a much cleaner way without empty divs: just make the icon a background image of the page heading with some left padding applied and some fine tuning of height and line-height to get it consistent with other admin pages.

Putting your plugin or option page in the top level of the admin menu via `add_menu_page()` uses the same implementation as for custom post type icons, but with different IDs. And WordPress throws in a generic icon as a `img` element so we need to hide that to replace it with our background image.

So all this combined leads to this snippet:

{% highlight php %}

<?php

/**
 * Option Page Icon for Admin Menu & Option Screen
 */

add_action( 'admin_head', 'option_page_icon' );

function option_page_icon() {
    ?>
    <style>
        /* Admin Menu - 16px
           Use only if you put your plugin or option page in the top level via add_menu_page()
        */
        #toplevel_page_PLUGINNAME-FILENAME .wp-menu-image {
            background: url(<?php bloginfo('template_url') ?>/images/icon-adminmenu16-sprite.png) no-repeat 6px 6px !important;
        }
        /* We need to hide the generic.png img element inserted by default */
        #toplevel_page_PLUGINNAME-FILENAME .wp-menu-image img {
            display: none;
        }
        #toplevel_page_PLUGINNAME-FILENAME:hover .wp-menu-image, #toplevel_page_PLUGINNAME-FILENAME.wp-has-current-submenu .wp-menu-image {
            background-position: 6px -26px !important;
        }

        /* Option Screen - 32px */
        #PLUGINNAME.icon32 {
            background: url(<?php bloginfo('template_url') ?>/images/icon-adminpage32.png) no-repeat left top !important;
        }

        @media
        only screen and (-webkit-min-device-pixel-ratio: 1.5),
        only screen and (   min--moz-device-pixel-ratio: 1.5),
        only screen and (     -o-min-device-pixel-ratio: 3/2),
        only screen and (        min-device-pixel-ratio: 1.5),
        only screen and (                min-resolution: 1.5dppx) {
            /* Admin Menu - 16px @2x
               Use only if you put your plugin or option page in the top level via add_menu_page()
            */
               #toplevel_page_PLUGINNAME-FILENAME .wp-menu-image {
                   background-image: url('<?php bloginfo('template_url') ?>/images/icon-adminmenu16-sprite_2x.png') !important;
                   -webkit-background-size: 16px 48px;
                   -moz-background-size: 16px 48px;
                   background-size: 16px 48px;
               }

               /* Option Screen - 32px @2x */
               #PLUGINNAME.icon32 {
                   background-image: url('<?php bloginfo('template_url') ?>/images/icon-adminpage32_2x.png') !important;
                   -webkit-background-size: 32px 32px;
                   -moz-background-size: 32px 32px;
                   background-size: 32px 32px;
               }
        }
    </style>
<?php }

?>

{% endhighlight %}

Just replace the bits in the ID selectors with your stuff. If you have problems finding the correct ID selector just inspect element in the admin area.

* * *

Please note these snippets are just suggestions. I tried to make them as much universal as possible and tested them but depending on your project this could need adjustments. And obviously the css rules for high-dpi assets depend on a browser capable of CSS media queries but I guess all devices with such screens have modern browsers handling this.

But there are a lot of ways to improve on that:

  * add these css rules to your own stylesheet if you’re using a custom admin area css file for your theme or plugin
  * enqueue the snippets with `wp_enqueue_style()` and the `admin_enqueue_scripts()` action hook
  * better yet, put them in a single stylesheet and enqueue them only on pages where they’re actually needed

## License

All code snippets are under the [GPL](http://opensource.org/licenses/gpl-3.0.html). The template psd is public domain, so you’re free to use and bundle this in any personal & commercial project without any requirements.

But if you’re super cool and want to catch some karma you place a link back to this release post ([http://kremalicious.com/wp-icons-template](http://kremalicious.com/wp-icons-template)) somewhere in your project or [buy me some delicious coffee](http://krlc.us/givecoffee).

## More Resources

If you need some inspiration for nicely consistent icons you should check out [these great admin icons from Laura Kalbag](http://laurakalbag.com/wordpress-admin-icons/).

And Julien Chaumond wrote a great piece, in his own words "less about the sizes, more about the style". It's a must-read: [How to design a good native-looking WordPress Admin icon](http://julien-c.fr/2012/07/wordpress-admin-icons/)
