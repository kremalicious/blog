---
type: post

title: 'Portal Thingy: matthiaskretschmann.com'
image: ../media/vcardsite-mk.png
author: Matthias Kretschmann

date: 2009-02-01 06:01:28+00:00

tags:
  - personal
---

Just some self reference here. I've launched a slick new site under [matthiaskretschmann.com](http://matthiaskretschmann.com) today which has an absolute simple concept. It's kind of a digital business card site for being digitally present under my name. Beside that it has Links to my social media stuff so it's easier for you to stalk me. In the 90's we probably would have called it a Portal.

As you can read in the sliding Colophon at the bottom of the site, it is written in valid XHTML 1.1 and CSS3 code and makes heavy use of jQuery. But, of course, it is fully functional without JavaScript enabled. Even the tab interface remains intact in such a case which is done by some PHP magic. Just the print and text-size buttons in the lower right will be gone without JavaScript. But that's ok because their functionality can be implemented just with JavaScript anyway.

For your learning pleasure I've let my comments in my [jQuery file](http://matthiaskretschmann.com/js/effects.js) intact and you'll also find the sources for code-parts where I didn't wanted to invent the wheel again. Although slightly modified by me, this includes the code for the vCard popup bubble when hovering over the header ([by jqueryfordesigner.com](http://jqueryfordesigners.com/coda-popup-bubbles/)) and the text-resizing function ([from dev-tips.com](http://dev-tips.com/featured/jquery-tip-font-resizing-with-animation-effects)) .

## Browser Compatibility

But the sad thing I had to learn was that Internet Explorer 7 and Google Chrome have heavy problems with transparent images (PNG24 with alpha transparency to be exactly) which are faded in or out with JavaScript (or just jQuery?). They look great when just there but during fade they have a big bold border. Once the fade is done the border disappears. Weird!

That's why some eye candy will not be displayed to Internet Explorer users (no big light spot and no hover effect on the header) and I hope Google will fix this soon. And following my own tradition Internet Explorer 6 and below users will get a big warning banner on top of the site.

For all other modern browsers beside those mentioned above the site should work well but you'll get the best viewing experience with [Safari](http://www.apple.com/safari/), [Firefox 3.1](http://www.mozilla.com/en-US/firefox/all-beta.html) or [Opera](http://www.opera.com/) (because of their [text-shadow support](http://www.kremalicious.com/2008/04/make-cool-and-clever-text-effects-with-css-text-shadow/)).

If you find a bug or have any additions feel free to [contact me](/contact), post them in the comments or [throw me a note on Twitter](https://twitter.com/kremalicious).

## Inspiration

With the concept of this little site I've kinda jumped on the bandwagon which obviously was started by [Tim van Damme's excellent small site under timvandamme.com](http://timvandamme.com/).

[![timvandamme.com](../media/vcardsite-tim.png)](http://timvandamme.com)

I was just blown away by the smart concept when first seeing this site last year and immediately made some rough sketches and drafts for my own implementation of this concept. But sadly time was too short for a new personal side project so everything laid down until last week.

Another great version based on Tim's concept was crafted by [Mr. Foliage-O-Meter Rogie King](http://www.komodomedia.com/) under [rogieking.com](http://rogieking.com/) and there was also a nice little discussion about inspiration in [Rogie's blog](http://www.komodomedia.com/blog/2009/01/timvandammecom/) after he had launched his site.

[![rogieking.com](../media/vcardsite-rogie.png)](http://rogieking.com)

Finally I find it very interesting to compare the jQuery code of the three sites afterwards. We all have some sort of tab interface with fancy stuff going on when the tabs change. But we wrote three completely different versions of code for that purpose but all with the same JavaScript library. Oh mighty flexible jQuery!

## More Business Card Style Sites

![lbaumann.com](../media/vcardsite-laurent.png)
[Icon- and UI-Designer Laurent Baumann](http://lbaumann.com/)

![maximilianschoening.com](../media/vcardsite-maximilian.png)
[Interface-Designer Maximilian Schöning](http://www.maximilianschoening.com/)

![arefjdey.com](../media/vcardsite-arefjdey.png)
[Consultant & Blogger Aref Jdey (Design & Code by yours truly)](http://www.arefjdey.com/)
