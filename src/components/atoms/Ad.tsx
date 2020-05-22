import React, { ReactElement } from 'react'
import styles from './Ad.module.scss'
import { useSiteMetadata } from '../../hooks/use-site-metadata'

export default function Ad(): ReactElement {
  const { ad } = useSiteMetadata()

  return (
    <a
      className={styles.ad}
      href={ad.link}
      data-track-content
      data-content-name="Text Ad"
      data-content-piece={ad.title}
    >
      {ad.title}
    </a>
  )
}
