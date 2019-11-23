import React from 'react'
import loadable from '@loadable/component'

const LazyDate = loadable.lib(() => import('date-fns'))

export default function Time({ date }: { date: string }) {
  const dateNew = new Date(date)

  return (
    <LazyDate>
      {({ format, formatDistance }) => (
        <time
          title={format(dateNew, 'yyyy/MM/dd HH:mm')}
          dateTime={dateNew.toISOString()}
        >
          {formatDistance(dateNew, Date.now(), { addSuffix: true })}
        </time>
      )}
    </LazyDate>
  )
}
