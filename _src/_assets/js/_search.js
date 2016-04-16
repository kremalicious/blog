
//=require ../../../node_modules/simple-jekyll-search/dest/jekyll-search.js

var Search = (function(w, d) {

    var app, _private, _config;

    _config = {
        content       : $('.site__content'),
        searchlink    : $('.search-btn, .js-search-init'),
        searcharea    : $('.search-area'),
        searchfield   : $('#search-input'),
        searchresults : $('#search-results'),
        searchpop     : $('#search-popover'),
        body          : $('body')
    };

    _private = {
        searchShow: function() {

            _config.searchlink.on('click', function(e) {
                e.preventDefault();

                $('[data-toggle="tooltip"]').tooltip('hide');

                // show search field
                _config.searcharea
                    .removeClass('is-ready animation-bounceOutUp')
                    .addClass('is-ready animation-slideDown')
                    .on('animationend webkitAnimationEnd oAnimationEnd', function(){
                        _config.body.addClass('has-search-open');
                    });

                _config.searchfield.focus();

                _private.searchSimpleJekyllSearch();

                // hide menu too just in case
                if (_config.body.hasClass('has-menu-open')) {
                    _config.body.removeClass('has-menu-open');
                }

                // bind the hide controls
                $(document).bind('click.hidethepop', function() {
                    _private.searchReset();

                    // unbind the hide controls
                    $(document).unbind('click.hidethepop');
                });

                // dont close thepop when click on thepop
                _config.searchpop.on('click', function(e) {
                    e.stopPropagation();
                });
                // dont close thepop when click on search field
                _config.searchfield.on('click', function(e) {
                    e.stopPropagation();
                });

                // and dont close thepop now
                e.stopPropagation();
            });
        },

        searchResultsShow: function() {
            // show popup upon first keypress
            _config.searchfield.on('keyup', function() {
                _config.searchpop.removeClass('hide');
            });
        },

        searchSimpleJekyllSearch: function() {
            SimpleJekyllSearch({
                searchInput: document.getElementById('search-input'),
                resultsContainer: document.getElementById('search-results'),
                json: '/search.json',
                searchResultTemplate: '<a class="search-link" href="{url}">{title}</a>',
                fuzzy: false
            });
        },

        searchHide: function() {
            $('.search-close').on('click', function(e) {
                e.preventDefault();

                _private.searchReset();

                // empty search field
                _config.searchfield.val('').blur();
            });
        },

        searchReset: function() {
            // revert all search elements
            _config.searcharea
                .removeClass('animation-slideDown')
                .addClass('animation-bounceOutUp')
                .on('animationend webkitAnimationEnd oAnimationEnd', function(){
                    _config.body.removeClass('has-search-open');
                });
            _config.searchpop.addClass('hide');
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
