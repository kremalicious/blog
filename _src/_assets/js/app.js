
//=require ../../../node_modules/webcomponents.js/CustomElements.js
//=require ../../../node_modules/svg4everybody/dist/svg4everybody.js
//=require ../../../node_modules/jquery/dist/jquery.js
//=require ../../../bower_components/time-elements/time-elements.js
//=require ../../../node_modules/vex-js/js/vex.combined.min.js

//
// include modules
//
//=include _menu.js
//=include _search.js
//=include _tooltips.js
//=include _analytics.js

(function($) {

    //
    // init modules
    //
    Menu.init();
    Search.init();
    Tooltips.init();
    GoogleAnalytics.init();

    svg4everybody({
        nosvg: false
    });

    $('.js-vex-btc').click(function(e) {
        e.preventDefault();

        vex.defaultOptions.className = 'vex-theme-kremalicious vex-bitcoin';
        vex.dialog.buttons.YES.text = 'Close';
        vex.open({
            content: '<h3 class=\"vex__title\">My Bitcoin Address</h3>\n <img src=\"/assets/img/btc-qr.png\" />\n <pre class=\"highlight\"><code class=\"nt\">171qDmKEXm9YBgBLXyGjjPvopP5o9htQ1V</code></pre>'
        });
    });

}(jQuery));
