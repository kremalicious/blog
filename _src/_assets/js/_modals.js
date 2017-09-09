//
// Vex modals
//

/* global vex, fetch */
/* exported krlcModals */

/* eslint-disable spaced-comment */
//=require vex-js/dist/js/vex.combined.js
/* eslint-enable spaced-comment */

const krlcModals = (() => { // eslint-disable-line no-unused-vars
    const _config = {
        btcVexTriggers: document.querySelectorAll('.js-vex-btc')
    }

    let btcAddress

    const _private = {
        getBtcAddress() {
            const url = '/api/site.json'

            fetch(url)
                .then(res => res.json())
                .then(data_ => {
                    btcAddress = data_[0].author.bitcoin
                })
                .catch(err => console.error(err))

            return btcAddress
        },

        vexBtc() {
            _config.btcVexTriggers.forEach(el => {
                el.addEventListener('click', e => {
                    e.preventDefault()

                    vex.defaultOptions.className = 'vex-theme-kremalicious vex-bitcoin'
                    vex.dialog.buttons.YES.text = 'Close'
                    vex.open({unsafeContent: '<h3 class="vex__title">My Bitcoin Address</h3>\n <img src="/assets/img/btc-qr.png" />\n <pre class="highlight"><a href="bitcoin:' + btcAddress + '"><code class="btcAddress nt">' + btcAddress + '</code></a></pre>'})
                })
            })
        }
    }

    return {
        init() {
            _private.getBtcAddress()
            _private.vexBtc()
        }
    }
})(); // eslint-disable-line semi
