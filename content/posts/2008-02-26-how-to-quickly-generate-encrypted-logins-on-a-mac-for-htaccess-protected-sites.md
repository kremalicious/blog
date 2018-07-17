---
layout: post

title: How to quickly generate encrypted .htpasswd passwords
author: Matthias Kretschmann

date: 2008-02-26 23:24:17+00:00
  
category: design
tags:
    - tutorial
    - osx
    - macos

coinhive: true

redirect_from:
    - /2008/02/how-to-quickly-generate-encrypted-logins-on-a-mac-for-htaccess-protected-sites/
---

As you may know you can easily password protect your website or parts of it using an htaccess file with special instructions on an [Apache](http://www.apache.org/)-based server. For using this method you just have to put a file named `.htaccess` (which includes the instructions for the webserver) and a file named `.htpasswd` (which includes the login-accounts) in the directory you want to have password protected. But you have to encrypt the passwords of the login data for yourself, which is a quick task on a Mac.

I won't go into detail what exactly is needed in your `.htaccess`, since it often depends on your hosting provider which instructions are allowed. If you are new to all this stuff and want to password protect your website or parts of it, have a look in the part [Password Protection](http://www.javascriptkit.com/howto/htaccess3.shtml) of the [Comprehensive guide to .htaccess written by Feyd](http://www.javascriptkit.com/howto/htaccess.shtml).

The login data, in detail just the password is stored encrypted in the .htpasswd-file but you have to encrypt it before writing it in this file. On a Mac you can benefit from the underlying [Unix](http://www.apple.com/macosx/technology/unix.html)-technology for quickly generating your login accounts using the commandline utility `htpasswd`.

Just open Terminal application and type in the following code and replace username and password with your desired data:

```shell
htpasswd -nb username password
```

and press enter. Terminal should output a new line containing your login data with an encrypted password. Just paste it in your `.htpasswd`-file and you're done.

It's that easy.
