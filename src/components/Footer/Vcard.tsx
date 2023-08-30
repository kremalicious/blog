import type { ReactElement } from 'react'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import Networks from './Networks'
import styles from './Vcard.module.css'

export default function Vcard(): ReactElement {
  const { author, rss, jsonfeed } = useSiteMetadata()
  const { mastodon, twitter, github, name, uri } = author
  // const avatar = getSrc(data.avatar.edges[0].node)
  const links = [mastodon, github, twitter, rss, jsonfeed]

  return (
    <>
      <img
        className={styles.avatar}
        // src={avatar}
        width="80"
        height="80"
        alt="avatar"
      />
      <p className={styles.description}>
        Blog of designer &amp; developer{' '}
        <a className="fn" rel="author" href={uri}>
          {name}
        </a>
      </p>

      <Networks links={links} />
    </>
  )
}
