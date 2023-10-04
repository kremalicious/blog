import { useStore } from '@nanostores/react'
import { $location } from '@stores/location'
import { formatDistance } from 'date-fns'
import { LocationItem } from './LocationItem'
import styles from './index.module.css'

export default function Location() {
  const { data, loading, error } = useStore($location)
  if (error) {
    console.error(`Failed to fetch location: ${error}`)
    return null
  }

  return (
    <section aria-label="Location" className={styles.location}>
      {loading && !data ? (
        <span className={styles.loading}>...</span>
      ) : data?.now?.city ? (
        <>
          <LocationItem
            country={data.now.country}
            countryCode={data.now.country_code}
            city={data.now.city}
            time="now"
          />

          <div className={styles.next}>
            {data.next?.city && (
              <LocationItem
                country={data.next.country}
                countryCode={data.next.country_code}
                city={data.next.city}
                time={formatDistance(
                  new Date(data.next.date_start),
                  Date.now()
                )}
                showFlag={data.now.country !== data.next.country}
              />
            )}
          </div>
        </>
      ) : null}
    </section>
  )
}
