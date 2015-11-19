
//=require ../../../node_modules/webcomponents.js/CustomElements.js
//=require ../../../node_modules/svg4everybody/dist/svg4everybody.js
//=require ../../../node_modules/jquery/dist/jquery.js
//=require ../../../bower_components/time-elements/time-elements.js
//=require ../../../bower_components/simple-jekyll-search/dest/jekyll-search.js

//
// include modules
//
//=include _menu.js
//=include _search.js

(function($) {

    //
    // init modules
    //
    Menu.init();
    Search.init();

    svg4everybody({
        nosvg: false
    });

}(jQuery));
