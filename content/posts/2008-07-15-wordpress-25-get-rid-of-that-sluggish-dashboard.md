---
layout: post

title: 'Wordpress 2.5+: Get Rid of That Sluggish Dashboard'
author: Matthias Kretschmann

date: 2008-07-15 14:04:46+00:00
  

categories:
- design
tags:
- tutorial
- wordpress
---

![Wordpress Logo by kremalicious](../media/wordpress-logo.png)Since Wordpress 2.5 it was nearly impossible for me to log into Wordpress and quickly head over to the write tab. The Dashboard always wants to load a bunch of things in it but this always seemed to fail in my setup and slow things down. And not enough the Dashboard just locks everything up while loading which can take more than one minute.

I've searched for a simple way of disabling those feeds, plugins etc. stuff the Wordpress Dashboard tries to fill but it seems you can't disable these from the backend. But there's a quick way for doing this which involves editing your /wp-admin/index-extra.php and uncomment some lines there. This will leave your Dashboard intact while it stops Wordpress from connecting to various sources to screw your blog up when you just want to quickly write something.

So open your `/wp-admin/index-extra.php` file. It should look like this:

{% highlight php %}
<?php
	require_once('admin.php');
	require( 'includes/dashboard.php' );
	require_once (ABSPATH . WPINC . '/rss.php');
	@header('Content-Type: ' . get_option('html_type') . '; charset=' . get_option('blog_charset'));
	switch ( $_GET['jax'] ) {
	case 'incominglinks' :
		wp_dashboard_incoming_links_output();
		break;
	case 'devnews' :
		wp_dashboard_rss_output( 'dashboard_primary' );
		break;
	case 'planetnews' :
		wp_dashboard_secondary_output();
		break;
	case 'plugins' :
		wp_dashboard_plugins_output();
		break;
	}
?>
{% endhighlight %}


Now just uncomment the lines so it looks like this (every line with two leading // is uncommented and therefore inactive):

{% highlight php %}
<?php
	require_once('admin.php');
	require( 'includes/dashboard.php' );
	// require_once (ABSPATH . WPINC . '/rss.php');
	@header('Content-Type: ' . get_option('html_type') . '; charset=' . get_option('blog_charset'));
	// switch ( $_GET['jax'] ) {
	//
	// case 'incominglinks' :
	// 	wp_dashboard_incoming_links_output();
	// 	break;
	//
	// case 'devnews' :
	// 	wp_dashboard_rss_output( 'dashboard_primary' );
	// 	break;
	//
	// case 'planetnews' :
	// 	wp_dashboard_secondary_output();
	// 	break;
	//
	// case 'plugins' :
	// 	wp_dashboard_plugins_output();
	// 	break;
	//
	// }
?>
{% endhighlight %}

And that's it. Save the file on your server, log in to your Wordpress backend and you should see your Dashboard with everything intact. It just won't search for incoming links and all those other RSS sources anymore.

Remember that every update of Wordpress will overwrite this file.
