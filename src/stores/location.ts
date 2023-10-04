import { atom, onMount } from 'nanostores'

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

export const $location = atom<LocationStore>(undefined)

onMount($location, () => {
  const controller = new AbortController()
  const signal = controller.signal

  async function getLocation() {
    try {
      const response = await fetch('https://location.kremalicious.com', {
        signal
      })
      const data = await response.json()
      if (!data) return
      $location.set(data)
    } catch (error) {
      console.error((error as Error).message)
    }
  }
  getLocation()

  return () => {
    controller.abort()
  }
})
