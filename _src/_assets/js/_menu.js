var Menu = (function(w, d) {

    var thesite = $('.site'),
        thelink = $('.menu-btn'),
        thepop  = $('.nav-popover');

    var app, _private;

    _private = {
        menuShow: function() {
            thelink.on('click', function(e) {
                e.preventDefault();

                // toggle menu
                thesite.toggleClass('menu-open');

                // bind the hide controls
                $(document).bind('click.hidethepop', function() {
                    thesite.removeClass('menu-open');
                    // unbind the hide controls
                    $(document).unbind('click.hidethepop');
                });

                // dont close thepop when you click on thepop
                thepop.on('click', function(e) {
                    e.stopPropagation();
                });

                // and dont close thepop now
                e.stopPropagation();
            });
        }
    };

    app = {
        init: function() {
            _private.menuShow();
        }
    };

    return app;

})(window, document);
