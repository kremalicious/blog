/*

 MAIN JS FOR KREMALICIOUS.COM
 -----------------------------------------------------------------

 Copyright (c) 2013 Matthias Kretschmann | http://mkretschmann.com

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

$(ASAP = function(){

	photoGrid.init();
    siteNavigation.init();

});

$(window).load( AfterLoad = function() {

	infiniteScroll.init();

});

var siteNavigation = {
    
    siteSearch: function() {
        
        var $searchlink    = $('.search-btn'),
            $searchpop     = $('.search-area'),
            $searchfield   = $('.search-field'),
            $searchresults = $('.search-results'),
            $navpop        = $('.nav-main .nav-popover');
        
        // init jekyll search
        $searchfield.simpleJekyllSearch({
            searchResults       : '.search-results',
            searchResultsTitle  : '',
            template            : '<a class="nav-link" href="{url}" title="{title}">{title}</a>',
        });
        
        $searchlink.click(function(e){
            e.preventDefault();
            
            // show search
            $searchpop.addClass('ready');
            $searchfield.focus();
            $searchresults.removeClass('hide');
            
            // hide menu too just in case
            if ( $navpop.is(':visible') ) {
                $navpop.addClass('hide');
            }
            
            // bind the hide controls
            $(document).bind('click.hidethepop', function() {
                $searchpop.removeClass('ready');
                $searchresults.addClass('hide');
                
                // unbind the hide controls
                $(document).unbind('click.hidethepop');
            });
            
            // dont close thepop when you click on thepop
            $searchpop.click(function(e) {
                e.stopPropagation();
            });
            
            // and dont close thepop now 
            e.stopPropagation();
        });
        
        $('.search-close').click(function(e){
            e.preventDefault();
            
            // hide search area
            $searchpop.removeClass('ready');
            $searchresults.addClass('hide');
            
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
            $thepop.toggleClass('show').toggleClass('hide');
            
            // bind the hide controls
            $(document).bind("click.hidethepop", function() {
                    $thepop.removeClass('show').addClass('hide');
                    // unbind the hide controls
                    $(document).unbind("click.hidethepop");
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
    
	init: function(){
		
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
			navSelector		: '.pagination',
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