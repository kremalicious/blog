import React from 'react'
import { Link } from 'gatsby'
import { Image } from '../../components/atoms/Image'
import styles from './PostTeaser.module.scss'
import { Post } from '../../@types/Post'

export default function PostTeaser({
  post,
  toggleSearch
}: {
  post: Post
  toggleSearch?: () => void
}) {
  const { image, title } = post.frontmatter
  const { slug } = post.fields

  return (
    <Link
      className={styles.post}
      to={slug}
      onClick={toggleSearch && toggleSearch}
    >
      {image ? (
        <Image fluid={image.childImageSharp.fluid} alt={title} />
      ) : (
        <div className={styles.empty} />
      )}
      <h4 className={styles.postTitle}>{title}</h4>
    </Link>
  )
}
