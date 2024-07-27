import { Buffer } from 'node:buffer'

window.global = window.global ?? window
window.Buffer = window.Buffer ?? Buffer
window.process = window.process ?? { env: {} } // Minimal process polyfill
