import type { ReactElement } from 'react'
import { Flag } from './Flag'

type LocationProps = {
  country: string
  countryCode: string
  city: string
  time: string
  showFlag?: boolean
}

export function LocationItem({
  country,
  countryCode,
  city,
  time,
  showFlag = true
}: LocationProps): ReactElement<LocationProps> {
  return (
    <>
      {showFlag && (
        <Flag
          country={{
            code: countryCode,
            name: country
          }}
        />
      )}
      {city} <span>{time}</span>
    </>
  )
}
