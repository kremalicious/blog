/* global krlcMenu, krlcSearch, krlcModals, svg4everybody */

/* eslint-disable spaced-comment */
//=require webcomponents.js/CustomElements.js
//=require svg4everybody/dist/svg4everybody.js
//=require jquery/dist/jquery.js
//=require time-elements/time-elements.js

//=include _menu.js
//=include _search.js
//=include _modals.js
/* eslint-enable spaced-comment */

//
// Init js modules
//
krlcSearch.init()
krlcMenu.init()
krlcModals.init()

svg4everybody({
    nosvg: false
})
