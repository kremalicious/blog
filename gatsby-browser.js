import './src/styles/global.scss'

// IntersectionObserver polyfill for gatsby-image (Safari, IE)
if (typeof window.IntersectionObserver === 'undefined') {
  import('intersection-observer')
}

import wrapPageElementWithLayout from './src/helpers/wrapPageElement'
export const wrapPageElement = wrapPageElementWithLayout

// Display a message when a service worker updates
// https://www.gatsbyjs.org/docs/add-offline-support-with-a-service-worker/#displaying-a-message-when-a-service-worker-updates
export const onServiceWorkerUpdateReady = () => {
  const div = document.createElement('div')
  div.id = 'toast'
  div.classList.add('alert', 'alert-info')
  div.innerHTML = `<button onClick="window.location.reload()">This application has been updated. <span>Click to Reload</span>.</button>`
  document.body.append(div)
}
