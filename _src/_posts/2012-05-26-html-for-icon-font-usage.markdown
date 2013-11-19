---
layout: link

title: HTML for Icon Font Usage
linkurl: http://css-tricks.com/html-for-icon-font-usage/
author: Matthias Kretschmann

date: 2012-05-26 05:13:58+00:00
wordpress_id: 2154
categories:
- design
post_format:
- Link
---

Chris Coyier on an accessible implementation for icon fonts:

> Where are we at right now in terms of the best markup for using icon fonts? Let's cover some options I think are currently the best. [...]

And our major goals here are:

>   1. As good of semantics as we can get
>   2. As little awkwardness for screen readers as possible

Spoiler: the key is to map the icons to the _Private Use Area_ instead of "real" characters in the font files and injecting them with pseudo elements.

I'm using [Font Awesome](http://fortawesome.github.com/Font-Awesome/) on this site which comes with icons mapped to PUA, so everything should be good for screen readers. Only concern to me are the quite ineffective CSS selectors like `[class*=" icon-"]` but this makes it nicely flexible.
