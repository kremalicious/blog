/* global Menu, Search, GoogleAnalytics, svg4everybody, vex */

/* eslint-disable spaced-comment */
//=require webcomponents.js/CustomElements.js
//=require svg4everybody/dist/svg4everybody.js
//=require jquery/dist/jquery.js
//=require time-elements/time-elements.js
//=require vex-js/dist/js/vex.combined.js

//=include _menu.js
//=include _search.js
//=include _tooltips.js
//=include _analytics.js
/* eslint-enable spaced-comment */


$(document).ready(() => {
    //
    // init modules
    //
    Menu.init()
    Search.init()
    GoogleAnalytics.init()
})


//
// Vex modals
//
const vexTriggers = document.querySelectorAll('.js-vex-btc')

vexTriggers.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault()

        vex.defaultOptions.className = 'vex-theme-kremalicious vex-bitcoin'
        vex.dialog.buttons.YES.text = 'Close'
        vex.open({
            unsafeContent: '<h3 class="vex__title">My Bitcoin Address</h3>\n <img src="/assets/img/btc-qr.png" />\n <pre class="highlight"><code class="nt">171qDmKEXm9YBgBLXyGjjPvopP5o9htQ1V</code></pre>'
        })
    }, false)
})

document.addEventListener('DOMContentLoaded', () => {
    svg4everybody({
        nosvg: false
    })
})
