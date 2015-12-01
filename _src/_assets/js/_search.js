
//=require ../../../bower_components/simple-jekyll-search/dest/jekyll-search.js

var Search = (function(w, d) {

    var content       = $('.site__content'),
        searchlink    = $('.search-btn'),
        searcharea    = $('.search-area'),
        searchfield   = $('#search-input'),
        searchresults = $('#search-results'),
        searchpop     = $('#search-popover');

    var app, _private;

    _private = {
        searchShow: function() {

            var body = $('body');

            searchlink.on('click', function(e) {
                e.preventDefault();

                // show search field
                searcharea
                    .removeClass('is-ready animation-bounceOutUp')
                    .addClass('is-ready animation-slideDown')
                    .on('animationend webkitAnimationEnd oAnimationEnd', function(){
                        body.addClass('has-search-open');
                    });

                searchfield.focus();

                _private.searchSimpleJekyllSearch();

                // hide menu too just in case
                if (body.hasClass('has-menu-open')) {
                    body.removeClass('has-menu-open');
                }

                // bind the hide controls
                $(document).bind('click.hidethepop', function() {
                    _private.searchReset();

                    // unbind the hide controls
                    $(document).unbind('click.hidethepop');
                });

                // dont close thepop when click on thepop
                searchpop.on('click', function(e) {
                    e.stopPropagation();
                });
                // dont close thepop when click on search field
                searchfield.on('click', function(e) {
                    e.stopPropagation();
                });

                // and dont close thepop now
                e.stopPropagation();
            });
        },

        searchResultsShow: function() {
            // show popup upon first keypress
            searchfield.on('keyup', function() {
                searchpop.removeClass('hide');
            });
        },

        searchSimpleJekyllSearch: function() {
            SimpleJekyllSearch({
                searchInput: document.getElementById('search-input'),
                resultsContainer: document.getElementById('search-results'),
                json: '/search.json',
                searchResultTemplate: '<li class="grid__col"><a class="search-link" href="{url}">{title}</a></li>',
                fuzzy: false
            });
        },

        searchHide: function() {
            $('.search-close').on('click', function(e) {
                e.preventDefault();

                _private.searchReset();

                // empty search field
                searchfield.val('').blur();
            });
        },

        searchReset: function() {
            // revert all search elements
            searcharea
                .removeClass('animation-slideDown')
                .addClass('animation-bounceOutUp')
                .on('animationend webkitAnimationEnd oAnimationEnd', function(){
                    $('body').removeClass('has-search-open');
                });
            searchpop.addClass('hide');
        }
    };

    app = {
        init: function() {
            _private.searchShow();
            _private.searchResultsShow();
            _private.searchHide();
        }
    };

    return app;

})(document, window);
