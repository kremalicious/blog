var Menu = (function(w, d) {

    var app, _private, _config;

    _config = {
        thesite : $('.site'),
        thelink : $('.menu-btn'),
        thepop  : $('.nav-popover')
    };

    _private = {
        menuShow: function() {
            _config.thelink.on('click', function(e) {
                e.preventDefault();

                $('[data-toggle="tooltip"]').tooltip('hide');

                // toggle menu
                _config.thesite.toggleClass('has-menu-open');

                // bind the hide controls
                $(document).bind('click.hidethepop', function() {
                    _config.thesite.removeClass('has-menu-open');
                    // unbind the hide controls
                    $(document).unbind('click.hidethepop');
                });

                // dont close thepop when you click on thepop
                _config.thepop.on('click', function(e) {
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
