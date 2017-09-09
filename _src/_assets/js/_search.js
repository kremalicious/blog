/* global SimpleJekyllSearch */
/* exported krlcSearch */

/* eslint-disable spaced-comment */
//=require simple-jekyll-search/dest/simple-jekyll-search.js
/* eslint-enable spaced-comment */

const krlcSearch = (() => { // eslint-disable-line no-unused-vars
    const _config = {
        searchlink: $('.search-btn, .js-search-init'),
        searcharea: $('.search-area'),
        searchfield: $('#search-input'),
        searchpop: $('#search-popover')
    }

    const _private = {
        searchHide() {
            // Revert all search elements
            _config.searcharea
                .removeClass('animation-slidedown')
                .addClass('animation-bounceOutUp')
                .on('animationend webkitAnimationEnd oAnimationEnd', () => {
                    $('body').removeClass('has-search-open')
                })
            _config.searchpop.addClass('hide')
        },

        searchClose() {
            $('.search-close').on('click', e => {
                e.preventDefault()

                _private.searchHide()

                // Empty search field
                _config.searchfield.val('').blur()
            })
        },

        searchShow() {
            _config.searchlink.on('click', e => {
                e.preventDefault()

                // Show search field
                _config.searcharea
                    .removeClass('is-ready animation-bounceOutUp')
                    .addClass('is-ready animation-slidedown')
                    .on('animationend webkitAnimationEnd oAnimationEnd', () => {
                        $('body').addClass('has-search-open')
                    })

                _config.searchfield.focus()

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
                    _private.searchHide()

                    // Unbind the hide controls
                    $(document).unbind('click.hidethepop')
                })

                // Dont close thepop when click on thepop
                _config.searchpop.on('click', e => {
                    e.stopPropagation()
                })
                // Dont close thepop when click on search field
                _config.searchfield.on('click', e => {
                    e.stopPropagation()
                })

                // And dont close thepop now
                e.stopPropagation()
            })

            // Show popup upon first keypress
            _config.searchfield.on('keyup', () => {
                _config.searchpop.removeClass('hide')
            })

            // Listen for close icon
            _private.searchClose()
        }
    }

    return {
        init: _private.searchShow
    }
})(); // eslint-disable-line semi
