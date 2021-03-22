import React, { ReactElement } from 'react'
import { button, hamburger, line } from './Hamburger.module.css'

export default function Hamburger({
  onClick
}: {
  onClick(): void
}): ReactElement {
  return (
    <button type="button" title="Menu" className={button} onClick={onClick}>
      <span className={hamburger}>
        <span className={line} />
        <span className={line} />
        <span className={line} />
      </span>
    </button>
  )
}
