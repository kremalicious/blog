import React, { ReactElement } from 'react'
import Icon from '../../core/Icon'
import styles from './PrevNext.module.css'

interface Node {
  title: string
  slug: string
}

interface PrevNextProps {
  prev: Node
  next: Node
}

const PrevNext = ({ prev, next }: PrevNextProps): ReactElement => (
  <nav className={styles.prevnext}>
    <div>
      {prev && (
        <a href={prev.slug}>
          <Icon name="ChevronLeft" />
          <p className={styles.label}>Newer</p>
          <h3 className={styles.title}>{prev.title}</h3>
        </a>
      )}
    </div>
    <div>
      {next && (
        <a href={next.slug}>
          <p className={styles.label}>Older</p>
          <h3 className={styles.title}>{next.title}</h3>
          <Icon name="ChevronRight" />
        </a>
      )}
    </div>
  </nav>
)

export default PrevNext
