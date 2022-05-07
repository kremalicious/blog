import React, { ReactElement, InputHTMLAttributes } from 'react'
import { input } from './Input.module.css'

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>): ReactElement {
  return <input className={`${input} ${className || ''}`} {...props} />
}
