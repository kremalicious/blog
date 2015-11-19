var s, Menu = {

    settings: {
        thesite: $('.site'),
        thelink: $('.menu-btn'),
        thepop:  $('.nav-popover')
    },

    init: function() {
        this.menuShow();
    },

    menuShow: function() {
        var s = this.settings;
        
        s.thelink.on('click', function(e) {
            e.preventDefault();

            // toggle menu
            s.thesite.toggleClass('menu-open');

            // bind the hide controls
            $(document).bind('click.hidethepop', function() {
                s.thesite.removeClass('menu-open');
                // unbind the hide controls
                $(document).unbind('click.hidethepop');
            });

            // dont close thepop when you click on thepop
            s.thepop.on('click', function(e) {
                e.stopPropagation();
            });

            // and dont close thepop now
            e.stopPropagation();
        });
    }
};
