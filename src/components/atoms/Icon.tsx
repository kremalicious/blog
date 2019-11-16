import React from 'react'

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
  Clipboard,
  Search,
  ExternalLink,
  Link,
  ChevronRight,
  ChevronLeft
} from 'react-feather'
// custom icons
import { ReactComponent as Jsonfeed } from '../../images/jsonfeed.svg'
import { ReactComponent as Bitcoin } from '../../images/bitcoin.svg'
import styles from './Icon.module.scss'

const components: any = {
  Download: ArrowDownCircle,
  Jsonfeed,
  Bitcoin,
  ArrowDownCircle,
  Edit,
  GitHub,
  Twitter,
  Rss,
  Sun,
  Moon,
  Compass,
  X,
  Clipboard,
  Search,
  ExternalLink,
  Link,
  ChevronRight,
  ChevronLeft
}

const Icon = ({ name }: { name: string }) => {
  const IconMapped = components[name]
  // const IconFeather = (Feather as any)[name]
  if (!IconMapped) return null

  return <IconMapped className={styles.icon} />
}

export default Icon
