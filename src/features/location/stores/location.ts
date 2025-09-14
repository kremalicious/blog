import type { LocationStore } from '../types'
import { createFetcherStore } from './fetcher'

const url = 'https://location.kremalicious.com'

export const $location = createFetcherStore<LocationStore>([url], {
  revalidateOnReconnect: true,
  revalidateOnFocus: true
})
