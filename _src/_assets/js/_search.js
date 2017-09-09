/* global SimpleJekyllSearch */

/* eslint-disable spaced-comment */
//=require simple-jekyll-search/dest/simple-jekyll-search.js
/* eslint-enable spaced-comment */

$(document).ready(() => {
    const searchlink = $('.search-btn, .js-search-init')
    const searcharea = $('.search-area')
    const searchfield = $('#search-input')
    const searchpop = $('#search-popover')

    const searchReset = () => {
        // Revert all search elements
        searcharea
            .removeClass('animation-slidedown')
            .addClass('animation-bounceOutUp')
            .on('animationend webkitAnimationEnd oAnimationEnd', () => {
                $('body').removeClass('has-search-open')
            })
        searchpop.addClass('hide')
    }

    searchlink.on('click', e => {
        e.preventDefault()

        // Show search field
        searcharea
            .removeClass('is-ready animation-bounceOutUp')
            .addClass('is-ready animation-slidedown')
            .on('animationend webkitAnimationEnd oAnimationEnd', () => {
                $('body').addClass('has-search-open')
            })

        searchfield.focus()

        SimpleJekyllSearch({ // eslint-disable-line new-cap
            searchInput: document.getElementById('search-input'),
            resultsContainer: document.getElementById('search-results'),
            json: '/api/search.json',
            searchResultTemplate: '<a class="search-link" href="{url}">{title}</a>',
            fuzzy: false
        })

        // Hide menu too just in case
        if ($('body').hasClass('has-menu-open')) {
            $('body').removeClass('has-menu-open')
        }

        // Bind the hide controls
        $(document).bind('click.hidethepop', () => {
            searchReset()

            // Unbind the hide controls
            $(document).unbind('click.hidethepop')
        })

        // Dont close thepop when click on thepop
        searchpop.on('click', e => {
            e.stopPropagation()
        })
        // Dont close thepop when click on search field
        searchfield.on('click', e => {
            e.stopPropagation()
        })

        // And dont close thepop now
        e.stopPropagation()
    })

    // Show popup upon first keypress
    searchfield.on('keyup', () => {
        searchpop.removeClass('hide')
    })

    $('.search-close').on('click', e => {
        e.preventDefault()

        searchReset()

        // Empty search field
        searchfield.val('').blur()
    })
})
