interface CSSModule {
  [className: string]: string
}

// type shims for CSS modules
declare module '*.module.scss' {
  const cssModule: CSSModule
  export = cssModule
}

declare module '*.module.css' {
  const cssModule: CSSModule
  export = cssModule
}

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const value: SvgrComponent
  export default value
}
