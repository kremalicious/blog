// make Typescript understand our Astro components
declare module '*.astro' {
  const component: AstroComponentFactory
  export default component
}

declare global {
  interface ImportMetaEnv {
    readonly PUBLIC_MAPBOX_ACCESS_TOKEN?: string
    readonly PUBLIC_UMAMI_SCRIPT_URL?: string
    readonly PUBLIC_UMAMI_WEBSITE_ID?: string
    readonly PUBLIC_INFURA_ID?: string
    readonly PUBLIC_WALLETCONNECT_ID?: string
    readonly PUBLIC_WEB3_API_URL?: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
