export type Location = {
  country: string
  city: string
  countryCode: string
  startDate: string
  endDate: string
}

export type LocationStore =
  | {
      now: Location
      next: Location
      previous: Location
    }
  | undefined
