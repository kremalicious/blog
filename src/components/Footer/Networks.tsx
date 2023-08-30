import type { ReactElement } from 'react'
import Icon from '../core/Icon'
import styles from './Networks.module.css'

function NetworkIcon({ link }: { link: string }) {
  let IconComp

  if (link.includes('mas.to')) {
    IconComp = <Icon name="Mastodon" />
  } else if (link.includes('twitter')) {
    IconComp = <Icon name="Twitter" />
  } else if (link.includes('github')) {
    IconComp = <Icon name="GitHub" />
  } else if (link.includes('feed.xml')) {
    IconComp = <Icon name="Rss" />
  } else if (link.includes('feed.json')) {
    IconComp = <Icon name="Jsonfeed" />
  } else {
    return null
  }

  return IconComp
}

export default function IconLinks({
  links
}: {
  links: string[]
}): ReactElement {
  return (
    <p>
      {links.map((link: string) => (
        <a key={link} className={styles.link} href={link} title={link} rel="me">
          <NetworkIcon link={link} />
        </a>
      ))}
    </p>
  )
}
