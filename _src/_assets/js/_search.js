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
            searchlink.on('click', function(e) {
                e.preventDefault();

                SimpleJekyllSearch({
                    searchInput: document.getElementById('search-input'),
                    resultsContainer: document.getElementById('search-results'),
                    json: '/search.json',
                    searchResultTemplate: '<li class="grid__col"><a class="search-link" href="{url}">{title}</a></li>',
                    fuzzy: false
                });

                // show search field
                searcharea
                    .removeClass('ready bounceOutUp')
                    .addClass('ready slideDown')
                    .on('animationend webkitAnimationEnd oAnimationEnd', function(){
                        content.addClass('search-open-blur');
                    });
                searchfield.focus();

                // hide menu too just in case
                if ($('body').hasClass('menu-open')) {
                    $('body').removeClass('menu-open');
                }

                // show search results upon typing
                if (searchfield.val().length) {
                    searchpop.removeClass('hide');
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

            // finally show popup upon first keypress
            searchfield.on('keyup', function() {
                searchpop.removeClass('hide');
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
                .removeClass('slideDown')
                .addClass('bounceOutUp')
                .on('animationend webkitAnimationEnd oAnimationEnd', function(){
                    content.removeClass('search-open-blur');
                });
            searchpop.addClass('hide');
        }
    };

    app = {
        init: function() {
            _private.searchShow();
            _private.searchHide();
        }
    };

    return app;

})(document, window);
