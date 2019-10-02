declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const value: SvgrComponent
  export default value
}
