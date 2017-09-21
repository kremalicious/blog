//
// Vex modals
//

/* global vex, fetch, Clipboard, QRious */
/* exported krlcModals */

/* eslint-disable spaced-comment */
//=require vex-js/dist/js/vex.combined.js
//=require clipboard/dist/clipboard.js
//=require qrious/dist/qrious.js
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
                                <canvas class="qr" id="qr-btc"></canvas>
                                <pre class="highlight"><code id="btcAddress" class="btcAddress nt" value="${btcAddress}">${btcAddress}</code><button class="btn" data-clipboard-target="#btcAddress" title="Copy to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path d="M16 8v8H8v4h12V8h-4zm0-2h6v16H6v-6H0V0h16v6zM2 2v12h12V2H2z"></path></svg></button></pre>
                            </div>
                            <div class="grid__col">
                                <h4>Ethereum</h4>
                                <canvas class="qr" id="qr-eth"></canvas>
                                <pre class="highlight"><code id="ethAddress" class="ethAddress nt" value="${ethAddress}">${ethAddress}</code><button class="btn" data-clipboard-target="#ethAddress" title="Copy to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path d="M16 8v8H8v4h12V8h-4zm0-2h6v16H6v-6H0V0h16v6zM2 2v12h12V2H2z"></path></svg></button></pre>
                            </div>
                        </div>
                        `
                    })

                    // Generate QR codes
                    const qrBtc = new QRious({
                        element: document.getElementById('qr-btc'),
                        value: btcAddress
                    })

                    const qrEth = new QRious({
                        element: document.getElementById('qr-eth'),
                        value: ethAddress
                    })

                    const qrOptions = {
                        backgroundAlpha: 0,
                        foreground: '#6b7f88',
                        size: 160
                    }

                    qrBtc.set(qrOptions)
                    qrEth.set(qrOptions)

                    // Clipboard button
                    const clipboard = new Clipboard('.btn')

                    clipboard.on('success', e => {
                        e.trigger.classList.add('success')
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
