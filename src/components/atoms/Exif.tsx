import React from 'react'
import ExifMap from './ExifMap'
import styles from './Exif.module.scss'

interface ExifProps {
  iso: string
  model: string
  fstop: string
  shutterspeed: string
  focalLength: string
  exposure: string
  gps: {
    latitude: string
    longitude: string
  }
}

export default function Exif({ exif }: { exif: ExifProps }) {
  const { iso, model, fstop, shutterspeed, focalLength, exposure, gps } = exif

  return (
    <aside className={styles.exif}>
      <div className={styles.data}>
        {model && <span title="Camera model">{model}</span>}
        {fstop && <span title="Aperture">{fstop}</span>}
        {shutterspeed && <span title="Shutter speed">{shutterspeed}</span>}
        {exposure && <span title="Exposure">{exposure}</span>}
        {iso && <span title="ISO">{iso}</span>}
        {focalLength && <span title="Focal length">{focalLength}</span>}
      </div>
      <div className={styles.map}>{gps && <ExifMap gps={gps} />}</div>
    </aside>
  )
}
