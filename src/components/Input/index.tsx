import type { InputHTMLAttributes, ReactElement } from 'react'
import styles from './index.module.css'

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>): ReactElement {
  return <input className={`${styles.input} ${className || ''}`} {...props} />
}
