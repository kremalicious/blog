import React, { ReactElement } from 'react'
import * as styles from './Input.module.css'

export default function Input({ className, ...props }: any): ReactElement {
  return <input className={`${styles.input} ${className || ''}`} {...props} />
}
