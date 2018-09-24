import React from 'react'
import PropTypes from 'prop-types'
import styles from './IconLinks.module.scss'

import { ReactComponent as Twitter } from '../../images/twitter.svg'
import { ReactComponent as Github } from '../../images/github.svg'
import { ReactComponent as Facebook } from '../../images/facebook.svg'
import { ReactComponent as Rss } from '../../images/rss.svg'
import { ReactComponent as Jsonfeed } from '../../images/jsonfeed.svg'

const NetworkIcon = ({ link }) => {
  let Icon

  if (link.includes('twitter')) {
    Icon = <Twitter className={styles.twitter} />
  } else if (link.includes('github')) {
    Icon = <Github className={styles.github} />
  } else if (link.includes('facebook')) {
    Icon = <Facebook className={styles.facebook} />
  } else if (link.includes('feed.xml')) {
    Icon = <Rss className={styles.rss} />
  } else if (link.includes('feed.json')) {
    Icon = <Jsonfeed className={styles.json} />
  }

  return Icon
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
