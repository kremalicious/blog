import React, { ReactElement } from 'react'
import Clipboard from 'react-clipboard.js'
import * as styles from './Copy.module.css'
import Icon from './Icon'

const onCopySuccess = (e: any) => {
  e.trigger.classList.add(styles.copied)
}

export default function Copy({ text }: { text: string }): ReactElement {
  return (
    <Clipboard
      data-clipboard-text={text}
      button-title="Copy to clipboard"
      onSuccess={(e: ClipboardJS.Event) => onCopySuccess(e)}
      className={styles.button}
    >
      <Icon name="Copy" />
    </Clipboard>
  )
}
