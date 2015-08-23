
//=require ../../../node_modules/webcomponents.js/CustomElements.js
//=require ../../../node_modules/svg4everybody/svg4everybody.js
//=require ../../../node_modules/jquery/dist/jquery.js
//=require ../../../node_modules/masonry-layout/dist/masonry.pkgd.js
//=require ../../../node_modules/imagesloaded/imagesloaded.js
//=require ../../../bower_components/time-elements/time-elements.js
//=require ../../../bower_components/simple-jekyll-search/dest/jekyll-search.js


$(ASAP = function() {

    siteNavigation.init();
    //siteEffects.init();

});

$(window).load(AfterLoad = function() {

    photoGrid.init();

});

var siteNavigation = {

    siteSearch: function() {

        var $content = $('.site__content'),
            $searchlink = $('.search-btn'),
            $searcharea = $('.search-area'),
            $searchfield = $('#search-input'),
            $searchresults = $('#search-results'),
            $searchpop = $('#search-popover');

        // revert all search elements
        function hideSearch() {
            $searcharea.removeClass('slideDown').addClass('bounceOutUp');
            $searchpop.addClass('hide');
            $content.removeClass('search-open-blur');
        }

        $searchlink.click(function(e) {
            e.preventDefault()

            SimpleJekyllSearch({
                searchInput: document.getElementById('search-input'),
                resultsContainer: document.getElementById('search-results'),
                json: '/search.json',
                searchResultTemplate: '<li class="grid__col"><a class="search-link" href="{url}">{title}</a></li>',
                fuzzy: false
            })

            // show search field
            $searcharea.removeClass('ready bounceOutUp').addClass('ready slideDown');
            $searchfield.focus();

            // blur the content
            $content.addClass('search-open-blur');

            // show search results upon typing
            if ($searchfield.val().length) {
                $searchpop.removeClass('hide');
            }

            // hide menu too just in case
            if ($('body').hasClass('menu-open')) {
                $('body').removeClass('menu-open');
            }

            // bind the hide controls
            $(document).bind('click.hidethepop', function() {
                hideSearch();

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

            hideSearch();

            // empty search field
            $searchfield.val('').blur();
        });
    },

    siteMenu: function() {
        var $thesite = $('.site'),
            $thelink = $('.menu-btn'),
            $thepop = $('.nav-popover');

        $thelink.click(function(e) {
            e.preventDefault();

            // toggle menu
            $thesite.toggleClass('menu-open');

            // bind the hide controls
            $(document).bind('click.hidethepop', function() {
                $thesite.removeClass('menu-open');
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
