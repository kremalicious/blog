import React, { ReactElement } from 'react'
import styles from './Exif.module.css'
import ExifMap from './ExifMap'
import Icon from './Icon'

const ExifData = ({
  title,
  value,
  icon
}: {
  title: string
  value: string
  icon: string
}) => (
  <span title={title}>
    <Icon name={icon} />
    {value}
  </span>
)

export default function Exif({
  exif
}: {
  exif: Queries.ImageExif
}): ReactElement {
  const { iso, model, fstop, shutterspeed, focalLength, exposure, gps } =
    exif.formatted

  const formattedModel = model === 'FC7203' ? 'DJI Mavic Mini' : model

  return (
    <aside className={styles.exif}>
      <div className={styles.data}>
        {formattedModel && (
          <ExifData title="Camera model" value={formattedModel} icon="Camera" />
        )}
        {focalLength && (
          <ExifData title="Focal length" value={focalLength} icon="Crosshair" />
        )}
        {fstop && <ExifData title="Aperture" value={fstop} icon="Aperture" />}
        {shutterspeed && (
          <ExifData
            title="Shutter speed"
            value={shutterspeed}
            icon="Stopwatch"
          />
        )}
        {exposure && <ExifData title="Exposure" value={exposure} icon="Sun" />}
        {iso && <ExifData title="ISO" value={iso} icon="Maximize" />}
      </div>
      {gps?.latitude && (
        <div className={styles.map}>
          <ExifMap gps={gps} />
        </div>
      )}
    </aside>
  )
}
