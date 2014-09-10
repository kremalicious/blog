---
layout: post

title: 'HowTo: Set A Custom Gravatar Image In Wordpress 2.7+'
author: Matthias Kretschmann

date: 2008-12-11 22:59:06+00:00
wordpress_id: 344
categories:
- design
tags:
- tutorial
---

![Wordpress Logo by kremalicious](/media/wordpress-logo.png)
Sure enough I've upgraded immediately when [Wordpress 2.7 was released](http://wordpress.org/development/2008/12/coltrane/). Among all the other things that changed in this new version the comments functions got a massive overhaul. But the [new comment loop](http://codex.wordpress.org/Migrating_Plugins_and_Themes_to_2.7/Enhanced_Comment_Display#The_Comments_Loop) with the [new function `<?php wp_list_comments(); ?>`](http://codex.wordpress.org/Template_Tags/wp_list_comments) lacks the ability to quickly set a custom default gravatar or avatar image. But with some help of the functions.php file we can set the default gravatar image in the Discussion settings in the Wordpress backend.

Before Wordpress 2.7 I achieved a custom gravatar image on kremalicious.com with this code placed in the comments.php template file:

{% highlight php %}
<?php 
	if(function_exists('get_avatar')) {
        echo get_avatar( 
				$comment, 
				$size = '70', 
				$default = '<?php bloginfo('template_directory'); ?>/images/gravatar.png' 
			);
	} 
?>
{% endhighlight %}

So we were able to set a path to our image we wanted to use as the default gravatar image. But with Wordpress 2.7 we have the new function [`<?php wp_list_comments(); ?>`](http://codex.wordpress.org/Template_Tags/wp_list_comments) which pretty much simplifies writing comment template code. Although it has a parameter for the avatar size it doesn't have one for setting a custom image like before.

But we can use the functions.php file in your template directory and add some lines to it: (If you don't have a functions.php file just create one.)

{% highlight php %}
<?php  
	function my_own_gravatar( $avatar_defaults ) {  
	    $myavatar = get_bloginfo('template_directory') . '/images/gravatar.png';  
	    $avatar_defaults[$myavatar] = 'GRAVATAR NAME DISPLAYED IN WORDPRESS';  
	    return $avatar_defaults;  
	}  
	add_filter( 'avatar_defaults', 'my_own_gravatar' );   
?>
{% endhighlight %}



Just set a name for your custom Gravatar image to show up beside the image in the Wordpress back-end. The code above assumes you have your custom default gravatar image inside a folder called images inside your template directory. Change it to your environment if neccessary. After that a new entry in the Wordpress backend under Settings > Discussions will appear with the custom image specified:

![custom gravatar](/media/custom-gravatar.jpg)

And you can adjust the displayed size of the gravatar image by adding a parameter to `<?php wp_list_comments(); ?>` function in your comments.php file:


{% highlight php %}
<?php wp_list_comments(array('avatar_size'=>70, )); ?>
{% endhighlight %}



And that's it. As you would guess I pretty much prefer this way to adjust the gravatar image. But you're free to [write your custom comment callback function](http://clarktech.no-ip.com/wordpress/wordpress-27-comment-callback-function) to exactly define the output of the comments. But it's definitely too much if you just want to change the gravatar stuff.