import React from 'react'
import { Link } from 'gatsby'
import Image from '../atoms/Image'
import styles from './PostTeaser.module.scss'

export default function PostTeaser({
  post,
  toggleSearch
}: {
  post: { fields: { slug: string }; frontmatter: { image: any; title: string } }
  toggleSearch?: () => void
}) {
  const { image, title } = post.frontmatter
  const { slug } = post.fields

  return (
    <li>
      <Link to={slug} onClick={toggleSearch && toggleSearch}>
        {image ? (
          <Image fluid={image.childImageSharp.fluid} alt={title} />
        ) : (
          <div className={styles.empty} />
        )}
        <h4 className={styles.postTitle}>{title}</h4>
      </Link>
    </li>
  )
}
