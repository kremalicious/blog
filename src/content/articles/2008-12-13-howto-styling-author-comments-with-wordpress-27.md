---
title: 'HowTo: Styling Author Comments With Wordpress 2.7+'
author: Matthias Kretschmann

date: 2008-12-13 16:47:43+00:00

tags:
  - design
  - tutorial
  - wordpress
---

![Wordpress Logo by kremalicious](../media/wordpress-logo.png)
Since my update to Wordpress 2.7 I'm pretty much into all the new comments stuff. As [I've written before](http://www.kremalicious.com/2008/12/how-to-set-a-custom-gravatar-image-in-wordpress-27/), the comment functionality changed dramatically with Wordpress 2.7. This makes writing a comments template much easier but if you used Worpress prior to 2.7 you have to change some things to work again. Beside other things this includes [Gravatar styling](http://www.kremalicious.com/2008/12/how-to-set-a-custom-gravatar-image-in-wordpress-27/) and also adding different styling to comments from the author of an article. In this article I will show you how to realize the latter with Wordpress 2.7 and above.

<!-- more -->

Let's start by looking at the code to achieve styling of author comments prior to Wordpress 2.7. On kremalicious.com I've used this code:

```php
<li class="
  <?php
    if ($comment->comment_author_url == "http://www.kremalicious.com")
      echo 'author';
    else echo $oddcomment;
  ?>
  item" id="comment-<?php comment_ID() ?>">
    <em>other comments code</em>
  </li>
```

So with some php stuff we were able to check for the author name or, as I did it, for the URL of the comment author. If one of these were detected Wordpress added a new class 'author' to the `<li>` tag which we were able to style by adding a li.author to our css file:

```css
li.author {
  /* css comes in here */
}
```

But with Wordpress 2.7 these steps are needless because of the [new function `<?php wp_list_comments(); ?>`](http://codex.wordpress.org/Template_Tags/wp_list_comments) which adds a class on author comments for itself!

If a comment from the author of an article is posted under this article, **Wordpress automatically adds the class 'bypostauthor' to the surrounding `<li>` tag.** So all you have to do is adding a css style of `li.bypostauthor` to your css file or just renaming your old `li.author` class or whatever you used for this:

```css
li.bypostauthor {
  /* css comes in here */
}
```

And that's it for adding a different style to comments from the article author. Just add some css and there you go. Wonderful!

## Even more

Wordpress also has a special class for registered users of your site so you're able to style their comments as well. For this just use the class 'byuser':

```css
li.byuser {
  /* css comes in here */
}
```

All the various classes Wordpress adds to comments are listed [in the Codex page for enhanced comments display](http://codex.wordpress.org/Migrating_Plugins_and_Themes_to_2.7/Enhanced_Comment_Display#CSS_Styling). And [here's a very nice grahical overview about everything Wordpress 2.7 adds to comments](http://www.wp-fun.co.uk/2008/12/10/27-comment-classes/).
