//
// Vex modals
//

/* global vex */
/* exported krlcModals */

/* eslint-disable spaced-comment */
//=require vex-js/dist/js/vex.combined.js
/* eslint-enable spaced-comment */

const krlcModals = (() => { // eslint-disable-line no-unused-vars
    const _config = {
        vexTriggers: document.querySelectorAll('.js-vex-btc'),
        modalContent: '<h3 class="vex__title">My Bitcoin Address</h3>\n <img src="/assets/img/btc-qr.png" />\n <pre class="highlight"><code class="nt">171qDmKEXm9YBgBLXyGjjPvopP5o9htQ1V</code></pre>'
    }

    const _private = {
        initVex() {
            _config.vexTriggers.forEach(el => {
                el.addEventListener('click', e => {
                    e.preventDefault()

                    vex.defaultOptions.className = 'vex-theme-kremalicious vex-bitcoin'
                    vex.dialog.buttons.YES.text = 'Close'
                    vex.open({unsafeContent: _config.modalContent})
                }, false)
            })
        }
    }

    return {
        init: _private.initVex
    }
})(); // eslint-disable-line semi
