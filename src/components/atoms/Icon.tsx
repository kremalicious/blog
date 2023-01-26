import React, { FunctionComponent, ReactElement } from 'react'

// https://featherstyles.com
// import * as Feather from '@kremalicious/react-feather'
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
import { ReactComponent as Mastodon } from '../../images/mastodon.svg'
import * as styles from './Icon.module.css'

const components: {
  [key: string]: FunctionComponent<React.SVGProps<SVGSVGElement>>
} = {
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
  Crosshair,
  Mastodon
}

const Icon = ({ name, ...props }: { name: string }): ReactElement => {
  const IconMapped = components[name]
  // const IconFeather = (Feather as any)[name]
  if (!IconMapped) return null

  return <IconMapped className={styles.icon} {...props} />
}

export default Icon
