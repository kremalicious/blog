/* global SimpleJekyllSearch */
/* exported krlcSearch */

/* eslint-disable spaced-comment */
//=require simple-jekyll-search/dest/simple-jekyll-search.js
/* eslint-enable spaced-comment */

const krlcSearch = (() => { // eslint-disable-line no-unused-vars
    const _config = {
        searchlink: document.getElementsByClassName('search-btn')[0],
        searcharea: document.getElementsByClassName('search-area')[0],
        searchclose: document.getElementsByClassName('search-close')[0],
        searchfield: document.getElementById('search-input'),
        searchpop: document.getElementById('search-popover'),
        searchresults: document.getElementById('search-results')
    }

    const _private = {
        searchHide() {
            // Revert all search elements
            _config.searcharea.classList.remove('animation-slidedown')
            _config.searcharea.classList.add('animation-bounceOutUp')
            _config.searchpop.classList.add('hide')
            document.body.classList.remove('has-search-open')
        },

        searchClose() {
            _config.searchclose.addEventListener('click', e => {
                e.preventDefault()

                _private.searchHide()

                // Empty search field
                _config.searchfield.value = ''
                _config.searchfield.blur()
            })
        },

        searchShow() {
            _config.searchlink.addEventListener('click', e => {
                e.preventDefault()

                // Show search field
                _config.searcharea.classList.remove('is-ready', 'animation-bounceOutUp')
                _config.searcharea.classList.add('is-ready', 'animation-slidedown')
                document.body.classList.add('has-search-open')

                _config.searchfield.focus()

                SimpleJekyllSearch({ // eslint-disable-line new-cap
                    searchInput: _config.searchfield,
                    resultsContainer: _config.searchresults,
                    json: '/api/search.json',
                    searchResultTemplate: '<a class="search-link" href="{url}">{title}</a>',
                    fuzzy: false
                })

                // Hide menu too just in case
                if (document.body.classList.contains('has-menu-open')) {
                    document.body.classList.remove('has-menu-open')
                }

                // Dont close thepop when click on thepop
                _config.searchpop.addEventListener('click', e => {
                    e.stopPropagation()
                })

                // Dont close thepop when click on search field
                _config.searchfield.addEventListener('click', e => {
                    e.stopPropagation()
                })

                // And dont close thepop now
                e.stopPropagation()
            })

            // Show popup upon first keypress
            _config.searchfield.addEventListener('keyup', () => {
                _config.searchpop.classList.remove('hide')
            })

            // Listen for close icon
            _private.searchClose()
        }
    }

    return {
        init: _private.searchShow
    }
})(); // eslint-disable-line semi
