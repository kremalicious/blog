---
date: 2020-05-10T21:51:12Z
updated: 2021-11-29T00:25:12+00:00

title: /uses
image: ./uses-teaser.png

tags:
  - personal
  - macos
  - ios
  - mac
  - iphone
  - design
  - development

toc: true
---

A continuously updated list of devices, tools, and services I use to get digital work & play done. Inspired by [uses.tech](https://uses.tech), check there for a list of everyone's /uses pages.

## Hardware

![The essentials.](./uses-devices.png)

My office is where my MacBook is, all these devices go wherever I travel to:

- **[MacBook Pro (16-inch, 2019)](https://www.apple.com/macbook-pro-16/)**  
  _Space Gray, 2.6GHz 6-Core Intel Core i7, 16 GB RAM, 512GB SSD, AMD Radeon Pro 5300M 4GB, US International keyboard_

- **[iPhone 11 Pro](https://www.apple.com/iphone-11-pro/)**  
  _Space Gray, 256GB_

- **[AirPods Pro](https://www.apple.com/airpods-pro/)**

- **[iPad Pro (12.9-inch) 2021](https://www.apple.com/ipad-pro/)**  
  _Space Gray, 512GB, WiFi + Cellular_

- **[Logitech MX Master 3 for Mac](https://www.logitech.com/en-us/products/mice/mx-master-3-mac-wireless-mouse.910-005693.html)**  
  _Black & Space Gray_

- **[Satechi Slim X1 Bluetooth Backlit Keyboard](https://satechi.net/products/slim-x1-bluetooth-backlit-keyboard)**  
  _US, Space Gray_

- **[Apple Watch Series 5](https://www.apple.com/apple-watch-series-5/)**  
  _40mm Space Gray Aluminum Case, Black Solo Loop_

- **[Raspberry Pi 4 Model B](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/)**  
  _4GB RAM_

- **[Kindle Paperwhite 11th Gen](https://www.amazon.com/dp/B08KTZ8249)**

## Software

It's [macOS](https://www.apple.com/macos/) & [iOS](https://www.apple.com/ios/) & [iPadOS](https://www.apple.com/ipados/) & [watchOS](https://www.apple.com/watchos/) all around. The majority of my work is done on macOS. My main web and development server is a droplet on [DigitalOcean](https://m.do.co/c/9882a054acf6) running [Ubuntu](https://ubuntu.com), allowing me to work from the iPad, among other things.

I keep it simple and use most of the default Apple apps across devices for all basic computing needs: **Mail**, **Calendar**, **Notes**, **Reminders**, **Contacts**, **Messages**, **Photos**, **Music**. Most of the additional apps I use have versions for macOS & iOS.

Living a cloud-first life where all my files are stored in some cloud service and are selectively synced to any device. Mail, Calendar, and Contacts are hooked up to personal and work **[Google G Suite](https://gsuite.google.com)** accounts.

I live with **automatic dark mode** where all my devices and apps have a light theme during the day, and a dark theme after sunset.

### File Storage & Sync

- **Finder & Files**  
  So simple, yet powerful. I use Finder & the iOS Files app to access all my files from multiple sources: iCloud, Tresorit, SSH servers through [Secure ShellFish](https://secureshellfish.app), local [network drives attached to my Raspberry Pi](/raspberry-pi-file-and-screen-sharing-macos-ios).

- **[iCloud Drive, 2 TB](https://www.icloud.com)**  
  I have used Dropbox Pro for many years but it became too clunky and Apple's version turned into what I wanted Dropbox to be. Most of my non-code related files live there and are happily synced.

- **[Tresorit Premium, 1 TB](https://tresorit.com)**  
  Holds all the personal and sensitive documents. Works like Dropbox or iCloud Drive but with end-to-end encryption with my own private keys, and some nicely paranoid sharing features.

- **[Scanner Pro](https://readdle.com/scannerpro)**  
  Listed here because this app on my iPhone makes every piece of paper coming across my desk into a digital file helping me maintain a **paperless office**. Works like a charm with any document in multiple languages making them searchable with OCR. Every scan I do with it produces a high quality black & white PDF file, ready for digital filing. This gives me quick access to every official document I might need to give to someone no matter where I am in the world. Scanned paper documents are then destroyed and put into recycling.

- **[Google Drive](https://www.google.com/drive/) & [Google Docs](https://docs.google.com)**  
  Only used for work accounts, and only within the browser. It still deeply confuses me and never use it for personal stuff.

### Browsing

- **[Safari](https://www.apple.com/safari/)**  
  My main browser on every device. I stay for best typography rendering of any browser, the feature & UI minimalism, and the privacy and content blocking features. No extensions at all except for 1Blocker.

- **[DuckDuckGo](https://duckduckgo.com)**  
  My search engine on all devices in all browsers.

- **[1Blocker](https://1blocker.com)**  
  My content blocker of choice for Safari so I rarely see any ad tech bullshit even outside of my network without Pi-Hole. Fast, effective, and completely unobtrusive on every device.

- **[Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/)**  
  My secondary browser on macOS mainly used for development and debugging. Running with those extensions:

  - [React Developer Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
  - [MetaMask](https://metamask.io): my browser wallet for all Web3 and Dapp testing.
  - [Privacy Badger](https://privacybadger.org/): I wish Safari content blockers could also be used in Firefox but Privacy Badger from EFF does a good job too.

- Test browsers: **Chrome**, **Edge**, **Brave**, **Opera**

### Development

![Terminal.app: Nord, SF Mono, Pure](./terminal.png)
![VS Code dark theme: Nord, SF Mono](./vscode-dark.png)
![VS Code light theme: Polar, SF Mono](./vscode-light.png)

- **[VS Code](https://code.visualstudio.com)**  
  From Notepad, to Dreamweaver, to CSS Edit, to Coda, to Espresso, to TextMate, to Atom, and now I arrived at VS Code. Its feature set, coding experience, and ecosystem far outweigh the Electron drawbacks, and at least it is the most performant Electron app I know. I still miss [Espresso](https://www.espressoapp.com) as my personal gold standard for how a code editor UI on macOS should look and behave. Using only a small set of extensions mostly for automatic code formatting based on various tools:

  - [Nord](https://marketplace.visualstudio.com/items?itemName=arcticicestudio.nord-visual-studio-code): patiently awaiting a light version of it, until then [Polar](https://marketplace.visualstudio.com/items?itemName=merithayan.polar) does the job.
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
  - [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
  - [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
  - [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Spell Right](https://marketplace.visualstudio.com/items?itemName=ban.spellright)
  - [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

- **[Nord](https://www.nordtheme.com)**  
  My go to syntax color theme for everything displaying code, including code snippets displayed on this blog.

- **[SF Mono](https://developer.apple.com/fonts/)** or **[Fira Code](https://github.com/tonsky/FiraCode)**  
  I can never decide and switch between them for everything which displays code.

- **Terminal.app**
  Switching between Terminal.app and the integrated terminal in VS Code all the time.

  - my default shell is **[Zsh](https://www.zsh.org)**
  - configured with my own **[dotfiles](https://github.com/kremalicious/dotfiles)**
  - styled with **[Pure](https://github.com/sindresorhus/pure)**.

- **[Git](https://git-scm.com)**  
  Most of my projects are under version control and are synced as Git repositories. Using Git in Terminal.app, within VS Code, and occasionally with [GitHub Desktop](https://desktop.github.com). Almost everything I do for work is embedded in a Git-based workflow. Every commit I create on any device is signed with one of my GPG keys.

- **[Kaleidoscope](https://www.kaleidoscopeapp.com)**  
  I'm a senior developer and still don't know how to properly resolve a merge conflict without this app.

- **[Docker Desktop](https://www.docker.com/products/docker-desktop)**  
  Lots of work projects are Dockerized so there's always a bunch of Docker containers running on my machine. Still prefer to directly use my local development environment for everything JavaScript/Node.js based.

- **[Transmit](https://www.panic.com/transmit/)**  
  Use it since like forever on macOS. Gives me file access to pretty much everything within my network and remote resources, including S3 & Wasabi on both, macOS & iOS.

- **[Secure ShellFish](https://secureshellfish.app)**  
  Just like Transmit gives me file access to network and remote resources over SSH & SFTP. But truly unique in its iOS integration where all resources simply show up in Files.app and can be used there on a daily basis. Also has a great terminal on top, which can even be started from Files.app.

- **[Working Copy](https://workingcopyapp.com)**  
  One of the most powerful development tools on iOS making version-controlled, on-device development actually possible. In my workflow it is the basis for doing quick code or copy edits. Because it is a document provider on iOS, I can directly access my cloned Git repositories from any other app.

- **[GitHub for mobile](https://github.com/mobile/)**  
  The iOS app is crazy good for quickly managing issues and code reviews. Rarely use the [desktop version](https://desktop.github.com).

- **[Homebrew](https://brew.sh)**  
  The trusty package manager for the Unix side of macOS, for all the stuff which is not Dockerized.

- **[nvm](https://github.com/nvm-sh/nvm)**  
  I need to switch between multiple Node.js versions throughout the day and nvm has always been perfect for that.

### Design

- **[Sketch](https://www.sketch.com)** & **[Figma](https://www.figma.com)**  
  I mostly design in the browser but when required, all my UI wireframing, prototyping, and design needs are met with either Sketch or Figma. Prefer Sketch for the perfectly native UI, but Figma for drawing performance and its collaboration features.

- **[Pixave](http://www.littlehj.com/mac/)**  
  Storing full page screenshots of every site or other visual work I create in here. Feels dated and buggy by now so in dire need of replacement.

- **[xScope](https://xscopeapp.com)**  
  When stuff on screen just has to be pixel-perfect. Always used to check for accessible colors in all UIs I create.

- **[Typeface](https://typefaceapp.com)**  
  My font manager of choice. Nice and simple.

- **[Sip](https://sipapp.io)**  
  Using this to pick colors from everywhere on the screen.

- **[ImageOptim](https://imageoptim.com)**  
  Every bitmap asset I put into production goes through this app to keep file size small.

### Photos

- **iCloud Photos**  
  All my master photos live in iCloud, and are selectively synced to devices in Photos.app. I make sure every photo ending up in here has the correct location and capturing date in its metadata, like for a lot of scanned analog photos from the last century.

- **[Photos](https://www.apple.com/ios/photos/)**  
  Using it on all devices, most edits happen on my iPhone with it. Metadata editing often happens in the [macOS version](https://www.apple.com/macos/photos/). Has everything I need since iOS 13. Originally, my library moved from folders, to iPhoto, to Aperture, to Lightroom, and from there back to Photos.

- **[Metaphoto](https://zininworks.com/metapho/)**  
  Excellent metadata editing on iOS for single photos, or bulk editing. Directly accesses and modifies the originals from Photos.app and writes modified location & date back to them.

- **[Halide](https://halide.cam)**  
  For capturing everything the image sensors of my iPhone can deliver. Gorgeous interaction & UI design.

- **[Darkroom](https://darkroom.co)**  
  For more refined editing on iOS.

- **[Affinity Photo](https://affinity.serif.com/en-gb/photo/)**  
  When a photo needs even more refined editing, primarily used on macOS.

### Music

- **Music**  
  Used iTunes to manage my music library since I use a Mac. Digitalized my CD library in Apple Lossless into it in the 2000s, first synced to mobile devices (iPod, then iPhone) via cable, then "synced" with iTunes Match without any cables. Now this library is running with Music, in a mix with Apple Music. This library with the lossless files is living on a network drive in my home network and is accessed from there when sitting at a Mac.

- **[iTunes Match](https://support.apple.com/en-us/HT204146)**  
  Yup, still using that. I try to buy music I like from the artist in a lossless format and store it in my Music library, and iTunes Match gives me access to its version from the Apple Music catalogue on all mobile devices.

- **[Apple Music](https://www.apple.com/apple-music/)**  
  Used for discovering new music and its excellent playlist curation.

### Messaging

- **Mail**  
  Apple's default email app has always worked for me, on all devices, so I just stick to it.

- **[GnuPG](https://gnupg.org)**  
  Use it since I use email but its clunky and rarely anyone uses it. Interacting with it only in Terminal.app for decrypting and encrypting, and use it to sign Git commits. Yes, I'm aware of [GPG Suite](https://gpgtools.org) but the instability it introduces into the whole operating system is not worth the usage to me.

- **[Messages](https://support.apple.com/explore/messages) & [WhatsApp](https://whatsapp.com)**  
  The only messengers I use every day for personal stuff, mostly on my iPhone.

- **[Signal](https://www.signal.org)**  
  In an ideal world everybody would use this so all our private messaging is not controlled by some single, closed-source entity with varying degrees of ad tech evilness.

- **[Slack](https://slack.com)**  
  The main work communication tool, mostly used on macOS. Loved and hated in equal parts.

### Writing

Except within Notes.app, everything I write is composed as [GitHub Flavored Markdown](https://github.github.com/gfm/).

- **[iA Writer](https://ia.net/writer)**  
  Every longer text I write starts and lives here first.

- **[VS Code](https://code.visualstudio.com)**  
  Most development-related writing ends up in VS Code, side-by-side with its Markdown preview.

### Password Management

- **[1Password](https://1password.com)**  
  Actively store pretty much every password in here. The 1Password keychain is only synced locally via WiFi to my other devices.

- **[iCloud Keychain](https://support.apple.com/en-us/HT204085)**  
  Replaces 1Password a lot for me during daily browsing because of its perfect integration into Safari.

### Reading

- **[Reeder](https://www.reederapp.com)**  
  Never stopped using RSS for my news reading and Reeder has always been a joy to use. Have it on all my devices but prefer reading on the iPad with it. I use [Feedly](https://feedly.com) to manage and sync my subscriptions in the background.

- **[Instapaper](https://www.instapaper.com)**  
  My read-later service, mostly reading articles through the Instapaper app on iPhone or iPad, but also have it setup in Reeder.

- **[Books](https://www.apple.com/apple-books/)**  
  I prefer buying ePub files directly from book authors which then end up in Books. Pretty much all my technical books live here and are synced via iCloud.

### Social Media

- **Twitter: [Twitterific](https://twitterrific.com/ios/)**  
  Using it since the first macOS version, now primarily used on the iPhone and the only way I interact with Twitter.

- **Reddit: [Apollo](https://apolloapp.io)**

### Health & Fitness

- **[Health](https://www.apple.com/ios/health/)** & **[Fitness](https://www.apple.com/watch/close-your-rings/)**  
  Any health and fitness-related app I use feeds data into these apps, making them my main health data dashboard.

- **[Workout](https://support.apple.com/en-us/HT204523)**  
  Everything I need from an app to track workouts, which only happens on watchOS these days. It is pretty much perfect and replaced [Runkeeper](https://runkeeper.com) for me.

### Backup

- **The Cloud™**  
  Everything I create is either stored in iCloud, Tresorit, or a pushed Git repository, making this my first line of defense for data loss.

- **[Arq](https://www.arqbackup.com)**  
  My second line of defense, the snapshot backup tool used for all Macs I had in the last years. Encrypts everything locally before uploading. The same backups are sent every hour to a [Wasabi](https://wasabi.com) bucket, and in my local network to a hard drive connected to the Raspberry Pi via Samba. I have kept all my former Mac snapshots within the same bucket on Wasabi, so I can always jump back to any of their snapshots. Always super stable and happy with it.

- **[iCloud Backup](https://support.apple.com/en-us/HT203977)**  
  All mobile devices simply use this to create their backups.

## Self Hosted

- I host my **[blog](https://kremalicious.com)** (which also includes my photo stream) and **[portfolio](https://matthiaskretschmann.com)** on **[AWS S3](https://aws.amazon.com/s3/)**, with **[Cloudflare](https://www.cloudflare.com)** in front of it.

- I run my own **web and development server**, a droplet on **[DigitalOcean](https://m.do.co/c/9882a054acf6)**, running **[Nginx](https://nginx.org)**.

- I run my own **analytics server** with **[Umami](https://umami.is)**.

- I run my own **Git repository hosting** with **[Gitea](https://gitea.com)** for private projects, and for automatically mirroring every GitHub repository I touch into it. A VPS running within **[Amazon Lightsail](https://aws.amazon.com/lightsail/)**.

- I run a public **[IPFS](https://ipfs.io)** node & gateway, powered by a VPS on **[Amazon Lightsail](https://aws.amazon.com/lightsail/)**, and the frontend delivered via **[Vercel](https://vercel.com)**.

- I run multiple **[Tor](https://www.torproject.org)** exit relays, VPS distributed between **[Scaleway](https://www.scaleway.com)** & **[OVH](https://www.ovh.com)**.

- For every other serverless and JAMstack need I prefer **[Vercel](https://vercel.com)**.
