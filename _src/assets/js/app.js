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

});

$(window).load( AfterLoad = function() {

	//siteEffects.init();
	infiniteScroll.init();

});

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

		if ( $('#photos').length > 0 ) {
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
			//photoGrid.init();
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