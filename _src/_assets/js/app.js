$(ASAP = function() {

    siteNavigation.init();
    //siteEffects.init();

});

$(window).load(AfterLoad = function() {

    photoGrid.init();

});

var siteNavigation = {

    siteSearch: function() {

        var $searchlink = $('.search-btn'),
            $searcharea = $('.topbar .search-area'),
            $searchfield = $('.search-field'),
            $searchresults = $('.search-results'),
            $searchpop = $('.popover');

        $searchlink.click(function(e) {
            e.preventDefault()

            // init jekyll search
            SimpleJekyllSearch({
                searchInput: $searchfield,
                resultsContainer: $searchresults,
                json: '/search.json',
                searchResultTemplate: '<a class="search-link" href="{url}" title="{title}">{title}</a>',
                fuzzy: true
            })

            // show search
            $searcharea.removeClass('ready bounceOutUp').addClass('ready slideDown');
            $searchfield.focus();
            if ($searchfield.val().length) {
                $searchpop.removeClass('hide');
            }

            // hide menu too just in case
            if ($('body').hasClass('menu-open')) {
                $('body').removeClass('menu-open');
            }

            // bind the hide controls
            $(document).bind('click.hidethepop', function() {
                $searcharea.removeClass('slideDown');
                $searchpop.addClass('hide');

                // unbind the hide controls
                $(document).unbind('click.hidethepop');
            });

            // dont close thepop when click on thepop
            $searchpop.click(function(e) {
                e.stopPropagation();
            });
            // dont close thepop when click on search field
            $searchfield.click(function(e) {
                e.stopPropagation();
            });

            // and dont close thepop now
            e.stopPropagation();
        });

        // finally show popup upon first keypress
        $searchfield.on('keyup', function() {
            $searchpop.removeClass('hide');
        });

        // close button
        $('.search-close').click(function(e) {
            e.preventDefault();

            // hide search area
            $searcharea.removeClass('slideDown').addClass('bounceOutUp');
            $searchpop.addClass('hide');

            // empty search field
            $searchfield.val('').blur();
        });
    },

    siteMenu: function() {
        var $thelink = $('.menu-btn'),
            $thepop = $('.nav-main .nav-popover');

        $thelink.click(function(e) {
            e.preventDefault();

            // toggle menu
            $('body').toggleClass('menu-open');

            if ($('body').hasClass('menu-open')) {
                $thepop.removeClass('hide');
            } else {
                $thepop.addClass('hide');
            }

            // bind the hide controls
            $(document).bind('click.hidethepop', function() {
                $('body').removeClass('menu-open');
                $thepop.toggleClass('hide');
                // unbind the hide controls
                $(document).unbind('click.hidethepop');
            });

            // dont close thepop when you click on thepop
            $thepop.click(function(e) {
                e.stopPropagation();
            });

            // and dont close thepop now
            e.stopPropagation();
        });
    },

    init: function() {
        this.siteSearch();
        this.siteMenu();
    }

}

var photoGrid = {

    masonryLayout: function() {
        var $container = $('#main .masonry');

        $container.imagesLoaded(function() {
            $container.masonry({
                itemSelector: 'article',
                columnWidth: '.grid-sizer'
            });
        });
    },

    init: function() {
        // only fire when photo page present and screen bigger than 480px
        if ($('.page-photos').length > 0) {
            this.masonryLayout();
        }
    }

}

var siteEffects = {

    init: function() {

    }

}
