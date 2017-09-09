/* exported krlcMenu */

const krlcMenu = (() => { // eslint-disable-line no-unused-vars
    const _config = {
        thesite: document.getElementsByClassName('site')[0],
        thelink: document.getElementsByClassName('menu-btn')[0],
        thepop: document.getElementsByClassName('nav-popover')[0]
    }

    const _private = {
        toggleMenu() {
            _config.thelink.addEventListener('click', e => {
                e.preventDefault()

                // Toggle menu
                _config.thesite.classList.toggle('has-menu-open')

                // Dont close thepop when you click on thepop
                _config.thepop.addEventListener('click', e => {
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
