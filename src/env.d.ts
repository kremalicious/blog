// make Typescript understand our Astro components
declare module '*.astro' {
  const component: AstroComponentFactory
  export default component
}

declare global {
  interface ImportMetaEnv {}

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
