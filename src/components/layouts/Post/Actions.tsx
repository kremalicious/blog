import React, { ReactElement } from 'react'
import { useSiteMetadata } from '../../../hooks/useSiteMetadata'
import Icon from '../../core/Icon'
import styles from './Actions.module.css'

interface ActionProps {
  title: string
  text: string
  icon: string
  url?: string
  onClick?(): void
}

const Action = ({ title, text, url, icon, onClick }: ActionProps) => {
  return (
    <a className={styles.action} href={url} onClick={onClick}>
      <Icon name={icon} />
      <h1 className={styles.actionTitle}>{title}</h1>
      <p className={styles.actionText}>{text}</p>
    </a>
  )
}

export default function PostActions({
  githubLink
}: {
  githubLink: string
}): ReactElement {
  const { author } = useSiteMetadata()

  return (
    <section className={styles.actions}>
      <Action
        title="Have a comment?"
        text="Hit me up @krema@mas.to"
        url={author.mastodon}
        icon="Mastodon"
      />
      <Action
        title="Found something useful?"
        text="Say thanks with BTC or ETH"
        url="/thanks"
        icon="Bitcoin"
      />
      <Action
        title="Edit on GitHub"
        text="Contribute to this post"
        url={githubLink}
        icon="GitHub"
      />
    </section>
  )
}
