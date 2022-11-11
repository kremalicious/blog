import { GatsbyBrowser } from 'gatsby'
import './src/global/global.css'
import './src/global/imports.css'

import wrapPageElementWithLayout from './src/helpers/wrapPageElement'
export const wrapPageElement: GatsbyBrowser['wrapPageElement'] =
  wrapPageElementWithLayout

// Display a message when a service worker updates
// https://www.gatsbyjs.org/docs/add-offline-support-with-a-service-worker/#displaying-a-message-when-a-service-worker-updates
export const onServiceWorkerUpdateReady: GatsbyBrowser['onServiceWorkerUpdateReady'] =
  () => {
    const div = document.createElement('div')
    div.id = 'toast'
    div.classList.add('alert', 'alert-info')
    div.innerHTML = `<button onClick="window.location.reload()">This application has been updated. <span>Click to Reload</span>.</button>`
    document.body.append(div)
  }
