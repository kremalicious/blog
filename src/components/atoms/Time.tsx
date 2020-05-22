import React, { ReactElement } from 'react'
import loadable from '@loadable/component'

const LazyDate = loadable.lib(() => import('date-fns'))

function TimeMarkup({
  date,
  format,
  formatDistance
}: {
  date: Date
  format?: any
  formatDistance?: any
}) {
  const dateIso = date.toISOString()

  return (
    <time
      title={format ? format(date, 'yyyy/MM/dd HH:mm') : dateIso}
      dateTime={dateIso}
    >
      {format ? formatDistance(date, Date.now(), { addSuffix: true }) : dateIso}
    </time>
  )
}

export default function Time({ date }: { date: string }): ReactElement {
  const dateNew = new Date(date)

  return (
    <LazyDate fallback={<TimeMarkup date={dateNew} />}>
      {({ format, formatDistance }) => (
        <TimeMarkup
          date={dateNew}
          format={format}
          formatDistance={formatDistance}
        />
      )}
    </LazyDate>
  )
}
