import { createFetcherStore } from './fetcher'

export type Location = {
  country: string
  city: string
  country_code: string
  date_start: string
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
