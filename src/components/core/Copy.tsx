import React, { ReactElement } from 'react'
import Clipboard from 'react-clipboard.js'
import { Copy } from '@images/icons'
import styles from './Copy.module.css'

const onCopySuccess = (e: any) => {
  e.trigger.classList.add(styles.copied)
}

export default function CopyAction({ text }: { text: string }): ReactElement {
  return (
    <Clipboard
      data-clipboard-text={text}
      button-title="Copy to clipboard"
      onSuccess={(e: ClipboardJS.Event) => onCopySuccess(e)}
      className={styles.button}
    >
      <Copy />
    </Clipboard>
  )
}
