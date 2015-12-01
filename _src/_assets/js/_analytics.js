
var GoogleAnalytics = (function(w, d, dnt) {

    var app, _private;

    _private = {
        //
        // Track Responsive Breakpoints
        //
        // stolen & adapted from
        // http://philipwalton.com/articles/measuring-your-sites-responsive-breakpoint-usage/
        //
        gaBreakpoints: function() {
            // Do nothing in browsers that don't support `window.matchMedia`.
            if (!window.matchMedia) return;

            // Prevent rapid breakpoint changes for all firing at once.
            var timeout;

            var breakpoints = {
                xxs: '(max-width: 479px)',
                xs:  '(min-width: 480px) and (max-width: 767px)',
                sm:  '(min-width: 768px) and (max-width: 991px)',
                md:  '(min-width: 992px) and (max-width: 1199px)',
                lg:  '(min-width: 1200px) and (max-width: 1599px)',
                hg:  '(min-width: 1600px)'
            };

            Object.keys(breakpoints).forEach(function(breakpoint) {
                var mql = window.matchMedia(breakpoints[breakpoint]);

                // Set the initial breakpoint on page load.
                if (mql.matches) {
                    ga('set', 'dimension1', breakpoint);
                }

                // Update the breakpoint as the matched media changes
                mql.addListener(function() {
                    if (mql.matches) {
                        clearTimeout(timeout);
                        timeout = setTimeout(function() {
                            ga('set', 'dimension1', breakpoint);
                        }, 1000);
                    }
                });
            });
        },


        //
        // Track Viewport
        //
        gaViewport: function() {
            var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            var dimensions = width + 'x' + height;

            ga('set', 'dimension2', dimensions);
        },


        //
        // Track Pixel Density
        //
        gaPixelDensity: function() {
            // Heads up!
            // window.devicePixelRatio doesn't work correctly in IE but whatever
            var pixeldensity = window.devicePixelRatio;

            ga('set', 'dimension3', pixeldensity);
        }

    };

    app = {
        init: function() {
            if (dnt !== "yes" && dnt !== "1") {
                _private.gaBreakpoints();
                _private.gaViewport();
                _private.gaPixelDensity();
            }
        }
    };

    return app;

})(window, document, navigator.doNotTrack || navigator.msDoNotTrack || null);
