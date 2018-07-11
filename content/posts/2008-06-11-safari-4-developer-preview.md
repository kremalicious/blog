---
layout: post

title: 'Safari 4 Developer Preview - Better Performance, Overhauled Web Inspector, New CSS'
author: Matthias Kretschmann

date: 2008-06-11 10:37:07+00:00
wordpress_id: 70
category: design
tags:
    - osx
    - macos
    - css
---

![Safari](/media/safari-logo.png)Apple released a developer preview of the upcoming version of its web browser Safari to registered Developers. The Safari 4 Developer Preview is available for Mac OS X Tiger/Leopard and Windows. While the main changes are not visible to the user the most significant visible new feature is the overhauled Web Inspector.

You can access Safari's Web Inspector through Develop > Show Web Inspector (you have to check the "Show Develop menu" box in the Preferences first to enable it). The Web Inspector, like the Firebug plug-in for Firefox, is a cool tool especially for Web Developers to inspect various elements of the website you're browsing.

The Navigation inside the Web Inspector is now moved from left to the top and there's a new "Databases" section and something like a browsing benchmarking "Profiles" section. All navigation tabs got new icons too.

![Web Inspector](/media/webinspector_3.png)

The "Resources" section got a slight overhaul too. With it you can see in which time the elements on your website were loaded with a nice graphical timeline.

![Web Inspector](/media/webinspector_2.png)

Among the visible new features in the Safari 4 Developer Preview is the ability to save websites as desktop applications or site-specific browsers (SSB) called Web Applications (File > Save as Web Application) and some more options for new windows or tabs in the General Preferences:

![Safari 4 New Windows And Tabs](/media/safari_4_tabs.png)

In terms of web standards and performance the Safari 4 Developer Preview passes the [Acid3 performance test](http://acid3.acidtests.org/) with 100/100 and is way more faster at rendering web pages.

Finally there seem to be a new css version implemented since Safari 4 now renders [this complicated text-shadow property described in a recent blog article (5.5 Multiple Shadows)](/make-cool-and-clever-text-effects-with-css-text-shadow/) correct. Beside that the text-rendering is a lot different causing the [light on dark text-shadow hack](/make-cool-and-clever-text-effects-with-css-text-shadow/) not to work on my website in Safari 4. Guess this is because all anti-alias rendering of text was replaced by sub-pixel rendering.

**update 06/11/2008:**Beside some more CSS3 stuff Safari 4 now includes all the cool recently announced WebKit features like [CSS gradients](http://webkit.org/blog/175/introducing-css-gradients/), [CSS masks](http://webkit.org/blog/181/css-masks/), [CSS reflection](http://webkit.org/blog/182/css-reflections/), [CSS transform](http://webkit.org/blog/130/css-transforms/) and [CSS animation](http://webkit.org/blog/138/css-animation/) too. (Did I miss something?)

Another new feature is the new full page zoom for zooming on web pages which was already implemented in the WebKit nightlies but [had to be manually activated](http://www.macosxhints.com/article.php?story=20080606045109546). In old Safari versions pressing Command + or - increased or decreased just the text size, sometimes destroying the whole layout of the page. The Safari 4 Developer Preview behaves just like the recent Firefox 3 RC1 and zooms out or zooms in the whole page layout and not just the text.

[![Web Inspector](/media/safari4_zoom_thumb.png)](/media/safari4_zoom.png)

And while Apple just [states in their press release](http://www.apple.com/pr/library/2008/06/09snowleopard.html) that Safari 4 delivers "the fastest implementation of JavaScript ever, increasing performance by 53 percent", other sources like [MacRumors](http://www.macrumors.com/2008/06/10/apple-seeds-safari-4-to-developers/) or [Macworld UK](http://www.macworld.co.uk/macsoftware/news/index.cfm?newsid=21625&pagtype=allchandate) expect this increased JavaScript performance to be based on the implementation of the freshly new [SquirrelFish JavaScript engine](http://webkit.org/blog/189/announcing-squirrelfish/).

If you're a registered Developer you can access the Developer Preview via your downloads page on [Apple's Developer Connection site](http://developer.apple.com/). Safari 4 comes as an installation package and requires a previously installed Safari 3.1.1 and a restart after installation. The new Safari 4 Developer Preview will overwrite your current Safari application but an uninstall package is also provided within the download. And be aware that somehow the whole font rendering in all applications based on WebKit (like NetNewsWire or Coda) will be changed by this installation.
