/* global ga */

//
// Track Responsive Breakpoints
//
// stolen & adapted from
// http://philipwalton.com/articles/measuring-your-sites-responsive-breakpoint-usage/
//
const gaBreakpoints = () => {
    // Do nothing in browsers that don't support `window.matchMedia`.
    if (!window.matchMedia) {
        return
    }

    // Prevent rapid breakpoint changes for all firing at once.
    let timeout

    const breakpoints = {
        xxs: '(max-width: 479px)',
        xs: '(min-width: 480px) and (max-width: 767px)',
        sm: '(min-width: 768px) and (max-width: 991px)',
        md: '(min-width: 992px) and (max-width: 1199px)',
        lg: '(min-width: 1200px) and (max-width: 1599px)',
        hg: '(min-width: 1600px)'
    }

    Object.keys(breakpoints).forEach(breakpoint => {
        const mql = window.matchMedia(breakpoints[breakpoint])

        // Set the initial breakpoint on page load.
        if (mql.matches) {
            ga('set', 'dimension1', breakpoint)
        }

        // Update the breakpoint as the matched media changes
        mql.addListener(() => {
            if (mql.matches) {
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    ga('set', 'dimension1', breakpoint)
                }, 1000)
            }
        })
    })
}


//
// Track Viewport
//
const gaViewport = () => {
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    const dimensions = width + 'x' + height

    ga('set', 'dimension2', dimensions)
}


//
// Track Pixel Density
//
const gaPixelDensity = () => {
    // Heads up!
    // window.devicePixelRatio doesn't work correctly in IE but whatever
    const pixeldensity = window.devicePixelRatio

    ga('set', 'dimension3', pixeldensity)
}


const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack

if (dnt !== 'yes' && dnt !== '1') {
    gaBreakpoints()
    gaViewport()
    gaPixelDensity()
}
