---
layout: post

title: Scan images directly into Apple Aperture
author: Matthias Kretschmann

date: 2008-05-05 04:15:11+00:00
wordpress_id: 46
category: photography
tags:
    - aperture
    - tutorial
    - osx
---

![Aperture Scanning](/media/aperturescan.png)Wouldn't that be great? Hook up your scanner, fire up Aperture, click on Import and the images coming directly from your scanner plate? Although my scanner is shown as a source in the import dialogue you can't import images with it directly from Aperture. But using Preview/Image Capture and Automator you can bypass this limitation. So here's what you can do to scan directly into Aperture in 3 simple steps.

In the Image Capture scan window you can define an automatic task which will follow the scan process. It defaults to Preview meaning that the scanned image will open as a new Preview document after the scan. But we can make the images import to Aperture after the scan just with tools which are build into Mac OS X and come with every Mac (besides Aperture).

# 1. Make an Automator action

![Automator](/media/automator.png)Open up Automator and click on the photos library item. Find the Aperture action "Import Photos" and drag and drop it on the workflow field. Then you can chose your desired project or a new project for the scanned images to appear. I have a project for all new images called @Review so I chose that one as my target project. You can set a referenced import or the deletion of your source images as well. If you want to chose the desired project or any of the other preferences every time you're scanning you have to activate "Show this action when the workflow runs" in the Options of this action.

To make it a bit cooler we can assign one or more keywords to our scanned images automatically. Just drag and drop the "Assign keywords to images" action and add a keyword like "Scan" or something like that. Finally we can set some usual IPTC-tags with the "Set IPTC Tags" action. In the end you should have something like this (click to zoom):

[![Aperture Import Workflow](/media/apertureimport_automator.png)](/media/apertureimport_automator.png)

# 2. Save it as a plug-in for Image Capture

[![Aperture Import Workflow2](/media/apertureimportplugin.png)](/media/apertureimportplugin.png)Now we're going to save the whole workflow we clicked together. But instead of saving it as a general workflow chose File > Save as Plug-in. Type in a name like "Import to Aperture" and chose Image Capture from the dropdown menu and click save. Now your workflow has become a freshly new plug-in of the Image Capture application. If you ever want to delete, edit or just backup your Image Capture Plugins you can find them in your user folder library under /Workflows/Applications/Image Capture.

# 3. Scanning and have fun

[![Aperture Import Workflow3](/media/apertureimport_automatic.png)](/media/apertureimport_automatic.png)Plug in your scanner and open up Image Capture. A new scan window should open with your connected scanner as source. Now we have to define our freshly created plug-in as a task which will run after the image was scanned. Just chose your freshly created workflow from the Automatic Task dropdown menu and there you have it. So after you hit the scan button our freshly created workflow will run after the scan.

Just be creative with Automator. You can set up a lot of workflows for every thinkable scanning task and you can even backup your scanned images before or after importing them to Aperture by copying them into a new burn folder or make an archive from them which also could be automatically saved to a web server and so on...
