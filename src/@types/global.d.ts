interface Window {
  __LUNR__: {
    readonly [language: string]: {
      readonly index: lunr.Index
      readonly store: {
        readonly [key: string]: any
      }
    }
  }
}
