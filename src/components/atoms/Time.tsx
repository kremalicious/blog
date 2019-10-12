import React from 'react'
import { format, formatDistance } from 'date-fns'

export default function Time({ date }: { date: string }) {
  const dateNew = new Date(date)

  return (
    <time
      title={format(dateNew, 'yyyy/MM/dd HH:mm')}
      dateTime={dateNew.toISOString()}
    >
      {formatDistance(dateNew, Date.now(), { addSuffix: true })}
    </time>
  )
}
