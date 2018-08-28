import React from 'react'
import PropTypes from 'prop-types'
import styles from './IconLinks.module.scss'

import Twitter from '../svg/Twitter'
import Github from '../svg/Github'
import Facebook from '../svg/Facebook'
import Rss from '../svg/Rss'
import Jsonfeed from '../svg/Jsonfeed'

const NetworkIcon = ({ link }) => {
  if (link.includes('twitter')) {
    return <Twitter className={styles.twitter} />
  } else if (link.includes('github')) {
    return <Github className={styles.github} />
  } else if (link.includes('facebook')) {
    return <Facebook className={styles.facebook} />
  } else if (link.includes('feed.xml')) {
    return <Rss className={styles.rss} />
  } else if (link.includes('feed.json')) {
    return <Jsonfeed className={styles.json} />
  }
}

const IconLinks = ({ links }) => (
  <p>
    {links.map(link => (
      <a key={link} className={styles.link} href={link}>
        <NetworkIcon link={link} />
      </a>
    ))}
  </p>
)

IconLinks.propTypes = {
  links: PropTypes.array.isRequired
}

export default IconLinks
