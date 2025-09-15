// relative-date.ts
// A11y: keeps absolute time in <time datetime="">,
// exposes human string in text, and updates only when
// the value would actually change.

const relativeDateTemplate = document.createElement('template')

relativeDateTemplate.innerHTML = `
  <style>
    :host { display: inline }
    time { font: inherit }
  </style>
  <time part="time"></time>
`

type Unit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'

class RelativeDate extends HTMLElement {
  #timeEl!: HTMLTimeElement
  #timer: number | null = null
  #rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })

  connectedCallback() {
    if (!this.shadowRoot)
      this.attachShadow({ mode: 'open' }).append(
        relativeDateTemplate.content.cloneNode(true)
      )
    const timeEl = this.shadowRoot?.querySelector('time')
    if (!(timeEl instanceof HTMLTimeElement)) return
    this.#timeEl = timeEl

    // Locale from lang attribute if present (reads once)
    const lang = this.getAttribute('lang') ?? undefined
    if (lang) this.#rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })

    // Initial paint + schedule; also wire minimal listeners
    document.addEventListener('visibilitychange', this.#onVis, {
      passive: true
    })
    window.addEventListener('pageshow', this.#onVis, { passive: true })
    this.#tick()
  }

  disconnectedCallback() {
    this.#stop()
    document.removeEventListener('visibilitychange', this.#onVis)
    window.removeEventListener('pageshow', this.#onVis)
  }

  // ---- internal ----
  readonly #onVis = () =>
    document.visibilityState === 'visible' ? this.#tick() : this.#stop()

  #parseDate(): Date | null {
    const raw = this.getAttribute('datetime')
    if (!raw) return null
    // Support ISO or epoch ms strings
    const n = Number(raw)
    const d = Number.isFinite(n) ? new Date(n) : new Date(raw)
    return Number.isNaN(d.getTime()) ? null : d
  }

  #formatRelative(d: Date): { text: string; unit: Unit } {
    const now = Date.now()
    const diffSec = Math.round((d.getTime() - now) / 1000) // negative = past
    const abs = Math.abs(diffSec)

    if (abs < 60)
      return { text: this.#rtf.format(diffSec, 'second'), unit: 'second' }
    const m = Math.round(diffSec / 60)
    if (Math.abs(m) < 60)
      return { text: this.#rtf.format(m, 'minute'), unit: 'minute' }
    const h = Math.round(m / 60)
    if (Math.abs(h) < 24)
      return { text: this.#rtf.format(h, 'hour'), unit: 'hour' }
    const dDays = Math.round(h / 24)
    if (Math.abs(dDays) < 7)
      return { text: this.#rtf.format(dDays, 'day'), unit: 'day' }
    const w = Math.round(dDays / 7)
    if (Math.abs(w) < 4)
      return { text: this.#rtf.format(w, 'week'), unit: 'week' }
    const mo = Math.round(dDays / 30)
    if (Math.abs(mo) < 12)
      return { text: this.#rtf.format(mo, 'month'), unit: 'month' }
    const y = Math.round(mo / 12)
    return { text: this.#rtf.format(y, 'year'), unit: 'year' }
  }

  #nextDelay(u: Unit): number {
    switch (u) {
      case 'second':
        return 1000
      case 'minute':
        return 60_000
      case 'hour':
        return 60 * 60_000
      case 'day':
        return 24 * 60 * 60_000
      case 'week':
        return 7 * 24 * 60 * 60_000
      case 'month':
        return 30 * 24 * 60 * 60_000
      case 'year':
        return 365 * 24 * 60 * 60_000
    }
  }

  #tick() {
    this.#stop()

    const d = this.#parseDate()
    if (!d) return

    const { text, unit } = this.#formatRelative(d)

    // Keep absolute time for a11y & tooltips
    this.#timeEl.dateTime = d.toISOString()
    if (!this.#timeEl.hasAttribute('title')) {
      const lang = this.getAttribute('lang') ?? undefined
      this.#timeEl.setAttribute('title', d.toLocaleString(lang))
    }
    if (this.#timeEl.textContent !== text) this.#timeEl.textContent = text

    if (document.visibilityState === 'visible') {
      this.#timer = window.setTimeout(() => this.#tick(), this.#nextDelay(unit))
    }
  }

  #stop() {
    if (this.#timer != null) {
      clearTimeout(this.#timer)
      this.#timer = null
    }
  }
}

if (!customElements.get('relative-date')) {
  customElements.define('relative-date', RelativeDate)
}
