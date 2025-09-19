import { describe, expect, it, vi } from 'vitest'

import './copy-button'

describe('CopyButton', () => {
  it('copies text to clipboard and adds class to button', () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true
    })

    const host = document.createElement('copy-button')
    host.innerHTML = '<button data-text="hello">Copy</button>'
    document.body.appendChild(host)

    const button = host.querySelector('button')
    if (!(button instanceof HTMLButtonElement))
      throw new Error('button not found')
    button.click()

    expect(writeText).toHaveBeenCalledWith('hello')
    expect(button.classList.contains('copied')).toBe(true)
  })

  it('does nothing when data-text is missing', () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true
    })

    const host = document.createElement('copy-button')
    host.innerHTML = '<button>Copy</button>'
    document.body.appendChild(host)

    const button = host.querySelector('button')
    if (!(button instanceof HTMLButtonElement))
      throw new Error('button not found')
    button.click()

    expect(writeText).not.toHaveBeenCalled()
    expect(button.classList.contains('copied')).toBe(false)
  })

  it('removes event listener on disconnect', () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true
    })

    const host = document.createElement('copy-button')
    host.innerHTML = '<button data-text="bye">Copy</button>'
    document.body.appendChild(host)

    const button = host.querySelector('button')
    if (!(button instanceof HTMLButtonElement))
      throw new Error('button not found')

    button.click()
    expect(writeText).toHaveBeenCalledTimes(1)
    expect(button.classList.contains('copied')).toBe(true)

    host.remove() // triggers disconnectedCallback → removes listener

    button.classList.remove('copied')
    button.click()
    expect(writeText).toHaveBeenCalledTimes(1)
    expect(button.classList.contains('copied')).toBe(false)
  })

  it('gracefully handles missing navigator.clipboard', () => {
    const originalClipboard = navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true
    })

    const host = document.createElement('copy-button')
    host.innerHTML = '<button data-text="noop">Copy</button>'
    document.body.appendChild(host)

    const button = host.querySelector('button')
    if (!(button instanceof HTMLButtonElement))
      throw new Error('button not found')
    button.click()

    expect(button.classList.contains('copied')).toBe(false)

    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true
    })
  })
})
