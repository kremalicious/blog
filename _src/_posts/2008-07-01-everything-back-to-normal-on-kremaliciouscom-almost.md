---
layout: post

title: Everything Back To Normal On Kremalicious.com (Almost)
author: Matthias Kretschmann

date: 2008-07-01 16:39:02+00:00
wordpress_id: 80
categories:
- personal
tags:
    - wordpress
---

![Server screwed](/media/xserve_screwed.png)As you may have noticed, kremalicious.com was a bit screwed in the last week and some of you have asked me via mail and twitter what exactly was wrong. So to satisfy the curious geek in you I will provide some informations about it.

It all started with a move of my whole website to new and shiny servers with PHP 5 running by my host. I didn't heard of any incompatibilities between the latest Wordpress version running on PHP 5 and in fact Wordpress loves to use PHP 5. But somehow I wasn't able to update my site neither over http or ftp. Since I can contact my host admins directly ([thank you jpBerlin/Heinlein-Support!](http://www.jpberlin.de/)) this problem was addressed rather quickly. They just neglected to tell me that the server address for login also changed (I should have think of this too). So all my changes were applied to my Wordpress installation on the old server. Problem solved I thought.

<!-- more -->

But more problems appeared. The display of the newest and latest posts and the next post/previous post links at the end of every article didn't work as they should. But not enough I wasn't able to moderate any comments. Sigh. Looked like any sort of database problem and I started a lot of things. First I manually scanned all database entries for any wrong things but I couldn't find anything suspicious. After that I dropped the whole database and imported my database dump but this didn't solve the problems. My final step was to re-install everything so that Wordpress creates the tables in the databse. And guess what: It didn't work too!

Now it's clear something with my code must be wrong, I thought. For displaying the latest posts in Wordpress I use a pretty standard way which is [described in the Wordpress Codex](http://codex.wordpress.org/Template_Tags/get_posts):

{% highlight php %}
<?php $postslist = get_posts('numberposts=5&order=DESC&orderby;=post_date');
 foreach ($postslist as $post) : setup_postdata($post); ?>
 	<ul>
 		<li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a><span><?php the_date(); ?></span></li>
 	</ul>
<?php endforeach; ?>
{% endhighlight %}

This would get all recent posts sorted by their post_date entry in the (wp_posts) database table and style it as an unordered list with my preferred format. This code worked since the launch of kremalicious.com and I first used it to display the recent blog entries on my start page. But since i didn't change anything in the code this couldn't be caused by wrong code or something.

So finally I've decided to [post a question](http://wordpress.org/support/topic/185896) describing my problems in the Wordpress support forums and that finally didn't solve my problems but now it was clear what caused this bad behavior: [A bug in MySQL](http://bugs.mysql.com/bug.php?id=32202)!

Now this makes sense! Beside the new PHP 5 version my host new server also included a new MySQL version which was affected [by this bug](http://bugs.mysql.com/bug.php?id=32202). The bug in short: Every query with GROUP BY just ignores the subsequent ORDER BY clause. Yeah, I found it!

This bug affects all versions of MySQL since 5.0.50 and it seems there is no stable version available at the moment with the fix included (please correct me if I'm wrong!). So if you're running Wordpress on a server with one of these MySQL versions installed you should experience my problems as well if you're using get_posts/orderby stuff.

Thankfully [a commenter](http://wordpress.org/support/topic/185896#post-793417) in the Wordpress forums reminded me of a nice temporary solution to this mess until my host updates MySQL: using wp_get_archives for displaying the recent posts. But this won't let me display the dates anymore:

{% highlight php %}<?php wp_get_archives('type=postbypost&limit;=5'); ?>{% endhighlight %}

Problem temporary solved!

The remaining problem is the wrong display of the next post/previous post links under every article (single.php). A commenter on my post in the Wordpress forum states that this could be caused by different loops interfering with each other. But I can't find anything wrong in my code with the loops and more important I didn't change the code and it worked fine before the server move. Now the only thing I can do is to wait for my host updating the MySQL installation. Then I will see if this remaining problem is caused by MySQL too. But as always, if you have any suggestions feel free to post them in the comments.
