import React, { ReactElement } from 'react'
import { useSiteMetadata } from '../../../hooks/use-site-metadata'
import * as styles from './Actions.module.css'
import Icon from '../../atoms/Icon'

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
  slug,
  githubLink
}: {
  slug: string
  githubLink: string
}): ReactElement {
  const { siteUrl } = useSiteMetadata()
  const urlTwitter = `https://twitter.com/intent/tweet?text=@kremalicious&url=${siteUrl}${slug}`

  return (
    <section className={styles.actions}>
      <Action
        title="Have a comment?"
        text="Hit me up @kremalicious"
        url={urlTwitter}
        icon="Twitter"
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
