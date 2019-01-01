import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ModalThanks from '../molecules/ModalThanks'
import styles from './PostActions.module.scss'

import { ReactComponent as Twitter } from '../../images/twitter.svg'
import { ReactComponent as Bitcoin } from '../../images/bitcoin.svg'
import { ReactComponent as GitHub } from '../../images/github.svg'

const ActionContent = ({ title, text, textLink }) => (
  <>
    <h1 className={styles.actionTitle}>{title}</h1>
    <p className={styles.actionText}>
      {text} <span className={styles.link}>{textLink}</span>
    </p>
  </>
)

ActionContent.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  textLink: PropTypes.string
}

const ActionTwitter = ({ url, slug }) => (
  <a
    className={styles.action}
    href={`https://twitter.com/intent/tweet?text=@kremalicious&url=${url}${slug}`}
  >
    <Twitter />
    <ActionContent
      title="Have a comment?"
      text="Hit me up"
      textLink="@kremalicious"
    />
  </a>
)

ActionTwitter.propTypes = {
  url: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
}

const ActionCrypto = ({ toggleModal }) => (
  <button className={styles.action} onClick={toggleModal}>
    <Bitcoin />
    <ActionContent
      title="Found something useful?"
      text="Say thanks with"
      textLink="Bitcoins or Ether"
    />
  </button>
)

ActionCrypto.propTypes = {
  toggleModal: PropTypes.func.isRequired
}

const ActionGitHub = ({ githubLink }) => (
  <a className={styles.action} href={githubLink}>
    <GitHub />
    <ActionContent
      title="Edit on GitHub"
      text="Contribute to this post on"
      textLink="GitHub"
    />
  </a>
)

ActionGitHub.propTypes = {
  githubLink: PropTypes.string.isRequired
}

export default class PostActions extends PureComponent {
  state = {
    showModal: false
  }

  static propTypes = {
    slug: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    githubLink: PropTypes.string.isRequired
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const { url, slug, githubLink } = this.props

    return (
      <aside className={styles.actions}>
        <div>
          <ActionTwitter url={url} slug={slug} />
        </div>

        <div>
          <ActionCrypto toggleModal={this.toggleModal} />
        </div>

        <div>
          <ActionGitHub githubLink={githubLink} />
        </div>

        {this.state.showModal && (
          <ModalThanks
            isOpen={this.state.showModal}
            handleCloseModal={this.toggleModal}
          />
        )}
      </aside>
    )
  }
}
