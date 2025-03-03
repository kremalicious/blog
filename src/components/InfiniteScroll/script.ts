/**
 * Core functionality for infinite scrolling
 */

// Shared state
let currentPage = 1
let isLoading = false
let autoLoadDone = false

/**
 * Extract configuration from a sentinel element
 */
export function getConfig(sentinel: HTMLElement) {
  return {
    currentPage: Number.parseInt(
      sentinel.getAttribute('data-current-page') || '1',
      10
    ),
    lastPage: Number.parseInt(
      sentinel.getAttribute('data-last-page') || '1',
      10
    ),
    baseUrl: sentinel.getAttribute('data-base-url') || '',
    contentSelector: sentinel.getAttribute('data-content-selector') || '#posts'
  }
}

/**
 * Set the loading state of the button
 */
export function setButtonLoading(button: HTMLButtonElement, loading: boolean) {
  if (loading) {
    button.style.cursor = 'not-allowed'
    button.style.opacity = '0.7'
    button.textContent = 'Loading...'
  } else {
    button.style.cursor = 'pointer'
    button.style.opacity = '1'
    button.textContent = 'Load More'
  }
}

/**
 * Fetch the next page content
 */
export async function fetchNextPage(baseUrl: string, nextPage: number) {
  const response = await fetch(`${baseUrl}${nextPage}/`)
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`)

  const html = await response.text()
  return new DOMParser().parseFromString(html, 'text/html')
}

/**
 * Append content from new page to the current page
 */
export function appendContent(doc: Document, contentSelector: string) {
  const newContent = doc.querySelector(contentSelector)
  const container = document.querySelector(contentSelector)

  if (!newContent || !container) {
    console.error('Content container not found')
    return false
  }

  container.append(...Array.from(newContent.children))
  return true
}

/**
 * Load the next page of content
 */
export async function loadNextPage(
  sentinel: HTMLElement,
  button: HTMLButtonElement,
  observer: IntersectionObserver
) {
  // Get current config
  const config = getConfig(sentinel)

  if (isLoading || config.currentPage >= config.lastPage) return

  try {
    isLoading = true
    setButtonLoading(button, true)

    const nextPage = config.currentPage + 1
    const doc = await fetchNextPage(config.baseUrl, nextPage)

    if (appendContent(doc, config.contentSelector)) {
      currentPage = nextPage
      sentinel.setAttribute('data-current-page', currentPage.toString())

      // Update button visibility
      if (currentPage < config.lastPage) {
        button.style.display = 'flex'
      } else {
        button.style.display = 'none'
        observer.disconnect()
      }
    }
  } catch (error) {
    console.error('InfiniteScroll error:', error)
  } finally {
    isLoading = false
    setButtonLoading(button, false)
  }
}

/**
 * Handle intersection observer events
 */
export function handleIntersection(
  entries: IntersectionObserverEntry[],
  sentinel: HTMLElement,
  button: HTMLButtonElement,
  observer: IntersectionObserver
) {
  const config = getConfig(sentinel)

  // Auto-load only first time (page 2)
  const shouldAutoLoad =
    entries[0].isIntersecting &&
    !autoLoadDone &&
    config.currentPage === 1 &&
    !isLoading

  if (shouldAutoLoad) {
    loadNextPage(sentinel, button, observer)
    autoLoadDone = true
  }

  // Show button after auto-load
  const shouldShowButton =
    autoLoadDone &&
    config.currentPage < config.lastPage &&
    button.style.display === 'none'

  if (shouldShowButton) button.style.display = 'flex'
}
