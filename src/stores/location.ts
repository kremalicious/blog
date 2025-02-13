import { createFetcherStore } from './fetcher'

export type Location = {
  country: string
  city: string
  // biome-ignore lint/style/useNamingConvention: external spec
  country_code: string
  // biome-ignore lint/style/useNamingConvention: external spec
  date_start: string
  // biome-ignore lint/style/useNamingConvention: external spec
  date_end: string
}

export type LocationStore =
  | {
      now: Location
      next: Location
      previous: Location
    }
  | undefined

const url = 'https://location.kremalicious.com'

export const $location = createFetcherStore<LocationStore>([url], {
  revalidateOnReconnect: true,
  revalidateOnFocus: true
})
