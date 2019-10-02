import React, { useState } from 'react'
import ModalThanks from '../molecules/ModalThanks'
import styles from './PostActions.module.scss'

import { ReactComponent as Twitter } from '../../images/twitter.svg'
import { ReactComponent as Bitcoin } from '../../images/bitcoin.svg'
import { ReactComponent as GitHub } from '../../images/github.svg'
import { useSiteMetadata } from '../../hooks/use-site-metadata'

const ActionContent = ({
  title,
  text,
  textLink
}: {
  title: string
  text: string
  textLink: string
}) => (
  <>
    <h1 className={styles.actionTitle}>{title}</h1>
    <p className={styles.actionText}>
      {text} <span className={styles.link}>{textLink}</span>
    </p>
  </>
)

const ActionTwitter = ({ slug }: { slug: string }) => {
  const { siteUrl } = useSiteMetadata()

  return (
    <a
      className={styles.action}
      href={`https://twitter.com/intent/tweet?text=@kremalicious&url=${siteUrl}${slug}`}
    >
      <Twitter />
      <ActionContent
        title="Have a comment?"
        text="Hit me up"
        textLink="@kremalicious"
      />
    </a>
  )
}

const ActionCrypto = ({ toggleModal }: { toggleModal(): void }) => (
  <button className={styles.action} onClick={toggleModal}>
    <Bitcoin />
    <ActionContent
      title="Found something useful?"
      text="Say thanks with"
      textLink="Bitcoins or Ether"
    />
  </button>
)

const ActionGitHub = ({ githubLink }: { githubLink: string }) => (
  <a className={styles.action} href={githubLink}>
    <GitHub />
    <ActionContent
      title="Edit on GitHub"
      text="Contribute to this post on"
      textLink="GitHub"
    />
  </a>
)

export default function PostActions({
  slug,
  githubLink
}: {
  slug: string
  githubLink: string
}) {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <aside className={styles.actions}>
      <div>
        <ActionTwitter slug={slug} />
      </div>

      <div>
        <ActionCrypto toggleModal={toggleModal} />
      </div>

      <div>
        <ActionGitHub githubLink={githubLink} />
      </div>

      {showModal && (
        <ModalThanks isOpen={showModal} handleCloseModal={toggleModal} />
      )}
    </aside>
  )
}
