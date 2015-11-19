var Search = {

    settings: {
        content:       $('.site__content'),
        searchlink:    $('.search-btn'),
        searcharea:    $('.search-area'),
        searchfield:   $('#search-input'),
        searchresults: $('#search-results'),
        searchpop:     $('#search-popover')
    },

    init: function() {
        s = this.settings;
        this.searchShow();
        this.searchHide();
    },

    searchShow: function() {
        s.searchlink.on('click', function(e) {
            e.preventDefault()

            SimpleJekyllSearch({
                searchInput: document.getElementById('search-input'),
                resultsContainer: document.getElementById('search-results'),
                json: '/search.json',
                searchResultTemplate: '<li class="grid__col"><a class="search-link" href="{url}">{title}</a></li>',
                fuzzy: false
            })

            // show search field
            s.searcharea.removeClass('ready bounceOutUp').addClass('ready slideDown');
            s.searchfield.focus();

            // blur the content
            s.content.addClass('search-open-blur');

            // hide menu too just in case
            if ($('body').hasClass('menu-open')) {
                $('body').removeClass('menu-open');
            }

            // show search results upon typing
            if (s.searchfield.val().length) {
                s.searchpop.removeClass('hide');
            }

            // bind the hide controls
            $(document).bind('click.hidethepop', function() {
                Search.searchReset();

                // unbind the hide controls
                $(document).unbind('click.hidethepop');
            });

            // dont close thepop when click on thepop
            s.searchpop.on('click', function(e) {
                e.stopPropagation();
            });
            // dont close thepop when click on search field
            s.searchfield.on('click', function(e) {
                e.stopPropagation();
            });

            // and dont close thepop now
            e.stopPropagation();
        });

        // finally show popup upon first keypress
        s.searchfield.on('keyup', function() {
            s.searchpop.removeClass('hide');
        });
    },

    searchHide: function() {
        $('.search-close').on('click', function(e) {
            e.preventDefault();

            Search.searchReset();

            // empty search field
            s.searchfield.val('').blur();
        });
    },

    searchReset: function() {
        // revert all search elements
        s.searcharea.removeClass('slideDown').addClass('bounceOutUp');
        s.searchpop.addClass('hide');
        s.content.removeClass('search-open-blur');
    }
}
