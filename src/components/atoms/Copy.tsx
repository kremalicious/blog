import React, { ReactElement } from 'react'
import { copied, button } from './Copy.module.css'
import Icon from './Icon'
import Clipboard from 'react-clipboard.js'

const onCopySuccess = (e: any) => {
  e.trigger.classList.add(copied)
}

export default function Copy({ text }: { text: string }): ReactElement {
  return (
    <Clipboard
      data-clipboard-text={text}
      button-title="Copy to clipboard"
      onSuccess={(e: ClipboardJS.Event) => onCopySuccess(e)}
      className={button}
    >
      <Icon name="Copy" />
    </Clipboard>
  )
}
