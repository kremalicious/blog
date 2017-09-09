/* global krlcMenu, krlcSearch, krlcModals, krlcAnalytics, svg4everybody */

/* eslint-disable spaced-comment */
//=require webcomponents.js/CustomElements.js
//=require svg4everybody/dist/svg4everybody.js
//=require jquery/dist/jquery.js
//=require time-elements/time-elements.js

//=include _menu.js
//=include _search.js
//=include _modals.js
//=include _analytics.js
/* eslint-enable spaced-comment */


//
// Init jQuery-based modules
//
$(document).ready(() => {
    krlcMenu.init()
    krlcSearch.init()
})


//
// Init js modules
//
krlcModals.init()

const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack

if (dnt !== 'yes' && dnt !== '1') {
    krlcAnalytics.init()
}

svg4everybody({
    nosvg: false
})
