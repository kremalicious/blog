import React from 'react'
import Clipboard from 'react-clipboard.js'

import styles from './Copy.module.scss'
import Icon from './Icon'

const onCopySuccess = (e: any) => {
  e.trigger.classList.add(styles.copied)
}

export default function Copy({ text }: { text: string }) {
  return (
    <Clipboard
      data-clipboard-text={text}
      button-title="Copy to clipboard"
      onSuccess={e => onCopySuccess(e)}
      className={styles.button}
    >
      <Icon name="Copy" />
    </Clipboard>
  )
}
