---
type: link

title: Why Files exist
linkurl: http://blog.filepicker.io/post/26157006600/why-files-exist
author: Matthias Kretschmann

date: 2012-06-30 18:17:33+00:00

tags:
  - design
---

[This](http://blog.filepicker.io/post/26157006600/why-files-exist) has been said many times, but it bears repeating:

> Files are abstraction layers around content that are necessary for interoperability. Without the notion of a File or other similar shared content abstraction, the ability to use different applications with the same information grinds to a halt, which hampers innovation and user experience.

A good example are all those note taking apps on iOS which usually only require plain text. When using Apple's iCloud to sync their data, they lock your content into one app without any way to access this from another app. Compare that to apps using Dropbox for note syncing: I can throw as many apps I would like at my notes folder full of .txt files. The note app you're using has some new quirks after the latest update? Just switch to another app. Apple's iCloud syncing Notes.app having some new quirks after the latest update? Well, you and your content are doomed.

But the solution can't be throwing a full file system at the user:

> Now, I agree with Steve Jobs [saying in 2005](http://tech.fortune.cnn.com/2012/06/06/steve-jobs-why-is-the-file-system-the-face-of-the-os/) that a full blow filesystem with folders and all the rest might not be necessary, but in every OS there needs to be at least some user-facing notion of a file, some system-wide agreed upon way to package content and send it between applications. Otherwise we’ll just end up with a few monolithic applications that do everything poorly.

Just applying the PC concept of a file system to post-PC devices, like Android and Dropbox did, makes only geeks happy but not the majority of users. While useful it's still too abstract for most users. That's why even Android kind of hides the file system, there's no built in app to browse it directly. But at least Android has [Intents](http://developer.android.com/guide/components/intents-filters.html), allowing users to send any data between different apps.

Apple already solved the problem of a file system being too abstract for users a long time ago, but without any app lock in. The [Newton OS on MessagePads](<http://en.wikipedia.org/wiki/Newton_(platform)>) stored everything in object-oriented databases called [soups](http://www.canicula.com/newton/prog/soups.htm). The "union soup" could be accessed by any app ("packages" to be exactly) on the system. Today, this is happening only rudimentarily on iOS, like when you start typing a recipient in Mail and it gets auto-completed from the Address Book data which obviously is only possible with Apple's apps.

Soups took away the need of manual file management without cutting access to the content. iCloud needs to be the new soup.
