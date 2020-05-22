import React, { ReactElement } from 'react'

// https://featherstyles.com
// import * as Feather from 'react-feather'
import {
  ArrowDownCircle,
  Edit,
  GitHub,
  Twitter,
  Rss,
  Sun,
  Moon,
  Compass,
  X,
  Copy,
  Search,
  ExternalLink,
  Link,
  ChevronRight,
  ChevronLeft,
  Camera,
  Aperture,
  Maximize,
  Crosshair
} from 'react-feather'
// custom icons
import { ReactComponent as Jsonfeed } from '../../images/jsonfeed.svg'
import { ReactComponent as Bitcoin } from '../../images/bitcoin.svg'
import { ReactComponent as Stopwatch } from '../../images/stopwatch.svg'
import styles from './Icon.module.scss'

const components: any = {
  Download: ArrowDownCircle,
  Jsonfeed,
  Bitcoin,
  Stopwatch,
  ArrowDownCircle,
  Edit,
  GitHub,
  Twitter,
  Rss,
  Sun,
  Moon,
  Compass,
  X,
  Copy,
  Search,
  ExternalLink,
  Link,
  ChevronRight,
  ChevronLeft,
  Camera,
  Aperture,
  Maximize,
  Crosshair
}

const Icon = ({ name }: { name: string }): ReactElement => {
  const IconMapped = components[name]
  // const IconFeather = (Feather as any)[name]
  if (!IconMapped) return null

  return <IconMapped className={styles.icon} />
}

export default Icon
