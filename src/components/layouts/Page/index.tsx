import React, { ReactElement, ReactNode } from 'react'
import styles from './index.module.css'

export default function Page({
  title,
  section,
  children
}: {
  title: string
  children: ReactNode
  section?: string
}): ReactElement {
  return (
    <>
      <h1 className={styles.pagetitle}>{title}</h1>
      {section ? <section className={section}>{children}</section> : children}
    </>
  )
}
