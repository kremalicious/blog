//
// Vex modals
//

/* global vex, fetch, Clipboard */
/* exported krlcModals */

/* eslint-disable spaced-comment */
//=require vex-js/dist/js/vex.combined.js
//=require clipboard/dist/clipboard.js
/* eslint-enable spaced-comment */

const krlcModals = (() => { // eslint-disable-line no-unused-vars
    const _config = {
        btcVexTriggers: document.querySelectorAll('.js-vex-btc')
    }

    let btcAddress
    let ethAddress

    const _private = {
        getBtcAddress() {
            const url = '/api/site.json'

            fetch(url)
                .then(res => res.json())
                .then(data_ => {
                    btcAddress = data_[0].author.bitcoin
                    ethAddress = data_[0].author.ether
                })
                .catch(err => console.error(err))

            return {btcAddress, ethAddress}
        },

        vexBtc() {
            _config.btcVexTriggers.forEach(el => {
                el.addEventListener('click', e => {
                    e.preventDefault()

                    vex.defaultOptions.className = 'vex-theme-kremalicious vex-bitcoin'
                    vex.dialog.buttons.YES.text = 'Close'
                    vex.open({unsafeContent: `
                        <h3 class="vex__title">Say thanks</h3>
                        <div class="grid grid--full grid-medium--half grid--gutters">
                            <div class="grid__col">
                                <h4>Bitcoin</h4>
                                <img class="qr" src="/assets/img/btc-qr.png" />
                                <pre class="highlight"><code id="btcAddress" class="btcAddress nt" value="${btcAddress}">${btcAddress}</code><button class="btn" data-clipboard-target="#btcAddress" title="Copy to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                                    <path d="M16 8v8H8v4h12V8h-4zm0-2h6v16H6v-6H0V0h16v6zM2 2v12h12V2H2z"></path>
                                </svg></button></pre>
                            </div>
                            <div class="grid__col">
                                <h4>Ethereum</h4>
                                <img class="qr" src="/assets/img/eth-qr.png" />
                                <pre class="highlight"><code id="ethAddress" class="ethAddress nt" value="${ethAddress}">${ethAddress}</code><button class="btn" data-clipboard-target="#ethAddress" title="Copy to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                                    <path d="M16 8v8H8v4h12V8h-4zm0-2h6v16H6v-6H0V0h16v6zM2 2v12h12V2H2z"></path>
                                </svg></button></pre>
                            </div>
                        </div>
                        `
                    })

                    const clipboard = new Clipboard('.btn')

                    clipboard.on('success', e => {
                        e.trigger.classList.add('success')

                        console.info('Action:', e.action)
                        console.info('Text:', e.text)
                        console.info('Trigger:', e.trigger)

                        e.clearSelection()
                    })
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
