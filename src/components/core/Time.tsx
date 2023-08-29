import React, { ReactElement } from 'react'
import { format, formatDistance } from 'date-fns'

export default function Time({ date }: { date: string }): ReactElement {
  const dateNew = new Date(date)
  const dateIso = dateNew.toISOString()

  return (
    <time title={format(dateNew, 'yyyy/MM/dd HH:mm')} dateTime={dateIso}>
      {formatDistance(dateNew, Date.now(), { addSuffix: true })}
    </time>
  )
}
