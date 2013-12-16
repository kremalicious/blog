
$(ASAP = function(){

	photoGrid.init();
    siteNavigation.init();
    siteEffects.init();
    
});

$(window).load( AfterLoad = function() {
	
    infiniteScroll.init();
    
});

var siteNavigation = {
    
    siteSearch: function() {
        
        var $searchlink    = $('.search-btn'),
            $searcharea     = $('.topbar .search-area'),
            $searchfield   = $('.search-field'),
            $searchresults = $('.search-results'),
            $searchpop        = $('.popover');
        
        // init jekyll search
        $searchfield.simpleJekyllSearch({
            searchResults       : '.search-results',
            searchResultsTitle  : '',
            template            : '<a class="nav-link" href="{url}" title="{title}">{title}</a>',
        });
        
        $searchlink.click(function(e){
            e.preventDefault();
            
            // show search
            $searcharea.addClass('ready');
            $searchfield.focus();
            if ( $searchfield.val().length ) {
                $searchpop.removeClass('hide');
            }
            
            // hide menu too just in case
            if ( $('body').hasClass('menu-open') ) {
                $('body').removeClass('menu-open');
            }
            
            // bind the hide controls
            $(document).bind('click.hidethepop', function() {
                $searcharea.removeClass('ready');
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
        $('.search-close').click(function(e){
            e.preventDefault();
            
            // hide search area
            $searcharea.removeClass('ready');
            $searchpop.addClass('hide');
            
            // empty search field
            $searchfield.val('').blur();
        });
    },
    
    siteMenu: function() {
        var $thelink = $('.menu-btn'),
            $thepop  = $('.nav-main .nav-popover');
        
        $thelink.click(function(e){
            e.preventDefault();
            
            // toggle menu
            $('body').toggleClass('menu-open');
            
            if ( $('body').hasClass('menu-open') ) {
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
    
	init: function(){
		this.siteSearch();
        this.siteMenu();
	}

}

var photoGrid = {

    masonryLayout: function() {
        var $container = $('#main .masonry');
        
        $container.imagesLoaded( function(){
            $container.masonry({
                itemSelector : 'article',
                columnWidth  : '.grid-sizer'
            });
        });
    },

    init: function(){
        // only fire when photo page present and screen bigger than 480px
        if ( $('.page-photos').length > 0 ) { 
            this.masonryLayout();
        }
    }

}

var siteEffects = {
    
    adaptiveBackground: function() {
        var opts = {
            selector: '.hmedia img',
            parent:   '.document'
        }
        
        $('.hmedia img').imagesLoaded( function(){
            $.adaptiveBackground.run(opts)
        });
        
        // jump to photo background start
        $(document).scrollTop($('#main').offset().top);
    },
    
	socialiteButtons: function() {
        
		$('.comments').one('mouseenter', function() {
			Socialite.load($(this)[0]);
		});
	},
    
	init: function(){
        if ( $('.page-single .format-photo').length > 0 ) {
            this.adaptiveBackground();
        }
		this.socialiteButtons();
	}

}

var infiniteScroll = {

	infiniteScrollSetup: function() {

		if ( $('.page-photos').length > 0 ) {
			var items	= '#main .masonry';
		} else {
			var items	= '#main article.hentry';
		}
		var	$scrollContent 	= $('#main');

		$scrollContent.infinitescroll({
			itemSelector	: items,
			nextSelector	: '.next a',
			navSelector		: '.paginator',
			binder			: $scrollContent,
			behavior 		: 'krlc3',
		}, function($scrollContent) {
            // run picturefill over retrieved items
            picturefill();
			// run the photogrid over retrieved items
			photoGrid.init();
		});

	},

	init: function(){
		this.infiniteScrollSetup();
	}

}

/*
	--------------------------------
	Infinite Scroll Behavior
	Manual mode with minimal loader

	Usage: behavior: 'krlc3'
	--------------------------------
*/
$.extend($.infinitescroll.prototype,{

	_setup_krlc3: function infscr_setup_krlc3 () {
		var opts = this.options,
			instance = this,
			loader = $('<span class="loading"> ...</span>');

		$(opts.nextSelector).parent().parent().addClass('infiniteLoader');

		// Bind nextSelector link to retrieve
		$(opts.nextSelector).click(function(e) {
			if (e.which == 1 && !e.metaKey && !e.shiftKey) {
				e.preventDefault();
				instance.retrieve();
			}
		});

		// custom start
		instance.options.loading.start = function (opts) {
			loader
				.appendTo(opts.nextSelector)
				.show(opts.loading.speed, function () {
                	instance.beginAjax(opts);
            });
		}

		// custom finish
		instance.options.loading.finished = function(opts) {
			loader.detach();
		};

	}

});