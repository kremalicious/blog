class CopyButton extends HTMLElement {
  #button: HTMLButtonElement | null = null
  #text: string | null = null

  connectedCallback() {
    this.#button = this.querySelector('button')
    this.#text = this.#button?.dataset.text ?? null

    this.#button?.addEventListener('click', this.#handleClick)
  }

  disconnectedCallback() {
    this.#button?.removeEventListener('click', this.#handleClick)
  }

  #handleClick = () => {
    const text = this.#text
    const button = this.#button
    if (!text || !button || !navigator?.clipboard) return

    navigator.clipboard.writeText(text)
    button.classList.add('copied')
  }
}

if (!customElements.get('copy-button')) {
  customElements.define('copy-button', CopyButton)
}
