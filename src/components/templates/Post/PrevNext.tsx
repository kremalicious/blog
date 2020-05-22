import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import Icon from '../../atoms/Icon'
import styles from './PrevNext.module.scss'

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
        <Link to={prev.slug}>
          <Icon name="ChevronLeft" />
          <p className={styles.label}>Newer</p>
          <h3 className={styles.title}>{prev.title}</h3>
        </Link>
      )}
    </div>
    <div>
      {next && (
        <Link to={next.slug}>
          <p className={styles.label}>Older</p>
          <h3 className={styles.title}>{next.title}</h3>
          <Icon name="ChevronRight" />
        </Link>
      )}
    </div>
  </nav>
)

export default PrevNext
