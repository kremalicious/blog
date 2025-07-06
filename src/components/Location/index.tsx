import { useStore } from '@nanostores/react'
import { formatDistanceToNowStrict } from 'date-fns'
import { $location } from '@/stores/location'
import styles from './index.module.css'
import { LocationItem } from './LocationItem'

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
            countryCode={data.now.countryCode}
            city={data.now.city}
            time="now"
          />

          <div className={styles.next}>
            {data.next?.city && (
              <LocationItem
                country={data.next.country}
                countryCode={data.next.countryCode}
                city={data.next.city}
                time={formatDistanceToNowStrict(new Date(data.next.startDate), {
                  addSuffix: true
                })}
                showFlag={data.now.country !== data.next.country}
              />
            )}
          </div>
        </>
      ) : null}
    </section>
  )
}
