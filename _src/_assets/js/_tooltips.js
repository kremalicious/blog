
//=require ../../../node_modules/bootstrap/js/tooltip.js

var Tooltips = (function(w, d) {

    var app, _private;

    _private = {
        tooltipsShow: function() {
            $('[data-toggle="tooltip"]').tooltip({
                placement: 'bottom',
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
                container: 'body'
            })
        }
    };

    app = {
        init: function() {
            _private.tooltipsShow();
        }
    };

    return app;

})(window, document);
