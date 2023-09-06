import React, { type InputHTMLAttributes, type ReactElement } from 'react'
import styles from './Input.module.css'

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>): ReactElement {
  return <input className={`${styles.input} ${className || ''}`} {...props} />
}
