import { useStore } from '@nanostores/react'
import { $location } from '@stores/location'
import { formatDistance } from 'date-fns'
import { LocationItem } from './LocationItem'
import styles from './index.module.css'

export default function Location() {
  const location = useStore($location)
  const isDifferentCountry = location?.now?.country !== location?.next?.country

  return (
    <section aria-label="Location" className={styles.location}>
      {location?.now?.city ? (
        <>
          <LocationItem
            country={location?.now.country}
            countryCode={location?.now.country_code}
            city={location?.now?.city}
            time="now"
          />

          <div className={styles.next}>
            {location?.next?.city && (
              <LocationItem
                country={location?.next.country}
                countryCode={location?.next.country_code}
                city={location?.next?.city}
                time={formatDistance(
                  new Date(location?.next.date_start),
                  Date.now()
                )}
                showFlag={isDifferentCountry}
              />
            )}
          </div>
        </>
      ) : null}
    </section>
  )
}
