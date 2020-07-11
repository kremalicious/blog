---
type: article

title: The Android Tab Bar Conundrum. Again.
image: ../media/tabs_overview.png
date: 2012-04-04 14:24:30+00:00

tags:
  - design
  - android
---

With [Instagram for Android](https://play.google.com/store/apps/details?id=com.instagram.android&hl=en) there's once again an app getting ported to Android from iOS which doesn't follow the platform specific guidelines with a lot of elements. But this time it's a bit complicated, let me explain.

Most obviously in the form of the app's main navigation tabs which Instagram for Android puts at the bottom as opposed to Google's suggested placement of tabs at the top as part of the action bar. Now smart Android designers [chime in and call foul](https://plus.google.com/109726284197282147930/posts/5McKooqNnnd) for this Android Design Guideline violation [as others](http://www.androiduipatterns.com/2011/07/tabs-top-or-bottom.html) and [I have done](http://exquisitedroid.com/cardcloud/) in the past with other apps.

## Problem No. 1: Navigation Controls

![Android Navigation Buttons](../media/android-navigation-buttons.png)

The suggested [top placement in the Android Design Guidelines](http://developer.android.com/design/building-blocks/tabs.html) was an answer to a typical Android specific problem: the very bottom of Android apps is reserved for on-screen navigation buttons, originally capacitative off-screen buttons. And those can get triggered accidentally when reaching tabs in a tab bar at the bottom of the screen. Let's dub this problem no. 1.

Now I'm usually all for breaking the rules because that's the only way innovation can happen. But this breaking needs to be thoroughly thought through and involves a deep understanding of the rules being broken. While a lot of iOS ports just use the bottom tab bar out of habit and non-thinking, [Tim](https://twitter.com/maxvoltar) and the Instagram guys don't fall in this camp.

## Problem No. 2: Longer Screens

![Galaxy Note](../media/android-galaxy-note.png)

The usage of a bottom tab bar in Instagram for Android is an answer to a relatively new problem which isn't incorporated in the Android Design Guidelines: bigger screens, or more precisely longer screens, make it very hard to reach tabs at the top of the screen when holding the device with one hand. When looking at all those new devices it seems clear screen sizes above 4" are now the norm for Android. This is problem no. 2.

In my view it all comes down to balancing those 2 problems against each other and, as said on Twitter, Tim decided to value problem 2 over problem 1:

> on the Galaxy Note it's impossible to get to the tabs with one hand if they're on top.

— Tim Van Damme ([@maxvoltar](https://twitter.com/maxvoltar)) [April 3, 2012](https://twitter.com/maxvoltar/status/187224604912254976)

And I'm afraid he's right: it's just more important for users to reach the tabs with one hand than preventing them from accidently triggering the OS buttons. When an app has a tab bar it's usually the main element to navigate inside an app so it's crucial to reach those elements very fast. Also problem 1 is less of a problem on devices like the Galaxy Nexus with its on-screen buttons, they just don't get triggered by accident so easily as those off-screen capacitive buttons.

## A way out

So we really need to rethink this specific guideline but this doesn't have to be just the decision between top or bottom placement of tabs.

There's another way out to solve both problems: Combining scrollable & fixed tabs. This is already used by Google in ICS's built-in Phone and People app (thanks Jake!). And Instagram for Android could have used the same fixed tabs on the top of the screen but combine them with a swipe left/right gesture to navigate between those tabs. (Per guideline a swipe view needs to get a corresponding scrollable, text-only tab bar)

Here's a quick mockup:

![Instagram swipe](../media/Instagram-Swipe.png)

Users wouldn't have to reach for the tabs to change views and nobody would accidently trigger the OS buttons at the bottom. The active states of the current and new tab item could fade corresponding to the swiping, same goes for the title of the current view in the very top bar. Another way could have been to split action & navigation tabs like [Guenther Beyer did in his mockup](https://plus.google.com/109726284197282147930/posts/5McKooqNnnd).
