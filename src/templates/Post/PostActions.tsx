import React, { useState } from 'react'
import ModalThanks from '../../components/organisms/ModalThanks'
import styles from './PostActions.module.scss'

import { ReactComponent as Twitter } from '../../images/twitter.svg'
import { ReactComponent as Bitcoin } from '../../images/bitcoin.svg'
import { ReactComponent as GitHub } from '../../images/github.svg'
import { useSiteMetadata } from '../../hooks/use-site-metadata'

interface ActionProps {
  title: string
  text: string
  url?: string
  onClick?(): void
}

const Icon = ({ text }: { text: string }) =>
  text.includes('GitHub') ? (
    <GitHub />
  ) : text.includes('Bitcoin') ? (
    <Bitcoin />
  ) : (
    <Twitter />
  )

const Action = ({ title, text, url, onClick }: ActionProps) => {
  return (
    <a className={styles.action} href={url} onClick={onClick}>
      <Icon text={text} />
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
}) {
  const { siteUrl } = useSiteMetadata()
  const [showModal, setShowModal] = useState(false)
  const urlTwitter = `https://twitter.com/intent/tweet?text=@kremalicious&url=${siteUrl}${slug}`

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <aside className={styles.actions}>
      <Action
        title="Have a comment?"
        text="Hit me up @kremalicious"
        url={urlTwitter}
      />
      <Action
        title="Found something useful?"
        text="Say thanks with Bitcoins or Ether"
        onClick={toggleModal}
      />
      <Action
        title="Edit on GitHub"
        text="Contribute to this post on GitHub"
        url={githubLink}
      />

      {showModal && (
        <ModalThanks isOpen={showModal} handleCloseModal={toggleModal} />
      )}
    </aside>
  )
}
