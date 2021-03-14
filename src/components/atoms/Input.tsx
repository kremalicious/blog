import React, { ReactElement } from 'react'
import { input } from './Input.module.css'

export default function Input({ className, ...props }: any): ReactElement {
  return <input className={`${input} ${className || ''}`} {...props} />
}
