import React, { ReactElement } from 'react'
import styles from './Input.module.css'

export default function Input(props: any): ReactElement {
  return <input className={styles.input} {...props} />
}
