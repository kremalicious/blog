import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './IconLinks.module.scss'

import { ReactComponent as Twitter } from '../../images/twitter.svg'
import { ReactComponent as Github } from '../../images/github.svg'
import { ReactComponent as Facebook } from '../../images/facebook.svg'
import { ReactComponent as Rss } from '../../images/rss.svg'
import { ReactComponent as Jsonfeed } from '../../images/jsonfeed.svg'

class NetworkIcon extends PureComponent {
  static propTypes = {
    link: PropTypes.string.isRequired
  }

  render() {
    const { link } = this.props
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
}

export default class IconLinks extends PureComponent {
  static propTypes = {
    links: PropTypes.array.isRequired
  }

  render() {
    return (
      <p>
        {this.props.links.map(link => (
          <a key={link} className={styles.link} href={link} title={link}>
            <NetworkIcon link={link} />
          </a>
        ))}
      </p>
    )
  }
}
