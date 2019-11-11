import React from 'react'
import { Link } from 'gatsby'
import styles from './PrevNext.module.scss'
import { ReactComponent as Right } from '../../images/chevron-right.svg'
import { ReactComponent as Left } from '../../images/chevron-left.svg'

interface Node {
  title: string
  slug: string
}

interface PrevNextProps {
  prev: Node
  next: Node
}

const PrevNext = ({ prev, next }: PrevNextProps) => (
  <nav className={styles.prevnext}>
    <div>
      {prev && (
        <Link to={prev.slug}>
          <Left />
          <p className={styles.label}>Older</p>
          <h3 className={styles.title}>{prev.title}</h3>
        </Link>
      )}
    </div>
    <div>
      {next && (
        <Link to={next.slug}>
          <p className={styles.label}>Newer</p>
          <h3 className={styles.title}>{next.title}</h3>
          <Right />
        </Link>
      )}
    </div>
  </nav>
)

export default PrevNext
