import React from 'react'

// https://featherstyles.com
import * as Feather from 'react-feather'
// custom icons
import { ReactComponent as Jsonfeed } from '../../images/jsonfeed.svg'
import { ReactComponent as Bitcoin } from '../../images/bitcoin.svg'
import styles from './Icon.module.scss'

const Icon = ({ name }: { name: string }) => {
  const components: any = {
    Download: Feather.ArrowDownCircle,
    Blog: Feather.Edit,
    Keybase: Feather.Key,
    Jsonfeed,
    Bitcoin
  }

  const IconMapped = components[name]
  const Icon = (Feather as any)[name]

  if (!IconMapped && !Icon) return null

  return IconMapped ? (
    <IconMapped className={styles.icon} />
  ) : (
    <Icon className={styles.icon} />
  )
}

export default Icon
