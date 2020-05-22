import React, { ReactElement } from 'react'
import styles from './Input.module.scss'

export default function Input(props: any): ReactElement {
  return <input className={styles.input} {...props} />
}
