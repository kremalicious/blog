import React, { ReactElement, InputHTMLAttributes } from 'react'
import * as styles from './Input.module.css'

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>): ReactElement {
  return <input className={`${styles.input} ${className || ''}`} {...props} />
}
