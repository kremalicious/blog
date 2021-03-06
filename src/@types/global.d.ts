declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >
  const src: string
  export default src
}

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
