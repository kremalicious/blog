---
layout: post

title: The Kremalicious MarsEdit Style
author: Matthias Kretschmann

date: 2008-08-22 17:04:19+00:00
  
categories:
- goodies
---

![The Kremalicious MarsEdit Style](../media/marsedit_kremalicious.png)Personally I blog everything with RedSweater's awesome application [MarsEdit](http://www.red-sweater.com/marsedit/). MarsEdit has a cool preview window included where you can see your writing live while you type. The formatting of this preview is based on simple HTML and CSS so the style is pretty customizable.

A while ago I've made a custom style for the blog on kremalicious.com and would like to share this style with you. The style is based on the colors used on kremalicious.com with a black background and light grey text on top of it. The links have the same blueish hover style as on my website:

[![The Kremalicious MarsEdit Style](../media/marsedit_kremalicious_big.png)](../media/marsedit_kremalicious_big.png)

Here's how to apply the style for your blog preview in MarsEdit:

In MarsEdit main window right-click (or ctrl + click) in the sidebar on the blog where you want to have my style applied to and choose Edit Preview Template. The Preview Template editor should open where you can customize the style of the preview with the css instructions in the header.

Just copy and paste the following HTML and CSS into your Preview Template editor. If something goes wrong with the source formatting, I've also provided [a txt file with the code](../media/marsedit_kremalicious.txt):


{% highlight html %}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
	    <title>#weblogName#: #title#</title>
	    <style>
		    body {margin: 0; background-color: #000;}

		    a {color: #778caa; text-decoration: none;}

		    a:hover {background-color: #778caa; color: #000; text-shadow: 0px 1px 1px #ddd;}

		    #title { color: #778caa; background-color: #333; margin: 0; font: normal 2.1em "HelveticaNeue-UltraLight", Helvetica, sans-serif;}

		    #title a {display: block; position: relative; padding: 10px 20px;}

		    #title a:hover {text-shadow: 0px 1px 1px #B3B3B3;}

		    #content {font: 1em "Lucida Grande", Lucida, Verdana, sans-serif; color: #ddd; padding: 10px 20px;}

		    #meta {margin-top: 20px; padding: 5px; background-color: #333; -webkit-border-radius: 5px;}

		    #credit {font: italic 0.8em/12px "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif; text-align: center; margin-top:20px;}
	    </style>
    </head>
    <body>

	    <div id="title">
	    	<a href="#url#">#title#</a>
	    </div>

	    <div id="content">
	    	#body#
	    	#extended#

		    <div id="meta">
			    <b>url</b>  : <a href="#url#">#url#</a><br />
			    <b>tags</b> : #tags#
		    </div>
		    <div id="credit">
			    The Kremalicious MarsEdit Style<br />
			    <a href="http://www.kremalicious.com">www.kremalicious.com</a>
		    </div>
	    </div> <-- end content -->

    </body>
</html>
{% endhighlight %}


Now click on Save Changes in the lower right corner of the window and there you have it.

Of course you are free to alter the style provided by me to fit your needs. If you have any additions to my provided code feel free to post them in the comments.
