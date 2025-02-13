// biome-ignore lint/correctness/noUnusedVariables: external spec
interface Window {
  // biome-ignore lint/style/useNamingConvention: external library
  __LUNR__: {
    readonly [language: string]: {
      readonly index: lunr.Index
      readonly store: {
        readonly [key: string]: unknown
      }
    }
  }
}
