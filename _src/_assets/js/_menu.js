$(document).ready(() => {
    const thesite = $('.site')
    const thelink = $('.menu-btn')
    const thepop = $('.nav-popover')

    thelink.on('click', e => {
        e.preventDefault()

        // Toggle menu
        thesite.toggleClass('has-menu-open')

        // Bind the hide controls
        $(document).bind('click.hidethepop', () => {
            thesite.removeClass('has-menu-open')
            // Unbind the hide controls
            $(document).unbind('click.hidethepop')
        })

        // Dont close thepop when you click on thepop
        thepop.on('click', e => {
            e.stopPropagation()
        })

        // And dont close thepop now
        e.stopPropagation()
    })
})
