/* exported krlcMenu */

const krlcMenu = (() => { // eslint-disable-line no-unused-vars
    const _config = {
        thesite: $('.site'),
        thelink: $('.menu-btn'),
        thepop: $('.nav-popover')
    }

    const _private = {
        toggleMenu() {
            _config.thelink.on('click', e => {
                e.preventDefault()

                // Toggle menu
                _config.thesite.toggleClass('has-menu-open')

                // Bind the hide controls
                $(document).bind('click.hidethepop', () => {
                    _config.thesite.removeClass('has-menu-open')
                    // Unbind the hide controls
                    $(document).unbind('click.hidethepop')
                })

                // Dont close thepop when you click on thepop
                _config.thepop.on('click', e => {
                    e.stopPropagation()
                })

                // And dont close thepop now
                e.stopPropagation()
            })
        }
    }

    return {
        init: _private.toggleMenu
    }
})(); // eslint-disable-line semi
