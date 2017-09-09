/* global svg4everybody, vex */

/* eslint-disable spaced-comment */
//=require webcomponents.js/CustomElements.js
//=require svg4everybody/dist/svg4everybody.js
//=require jquery/dist/jquery.js
//=require time-elements/time-elements.js
//=require vex-js/dist/js/vex.combined.js

/* eslint-disable spaced-comment */
//=include _analytics.js
//=include _search.js
//=include _menu.js
/* eslint-enable spaced-comment */


//
// Vex modals
//
const vexInit = () => {
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
}

vexInit()

svg4everybody({
    nosvg: false
})
