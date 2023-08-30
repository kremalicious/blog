import type { ReactElement } from 'react'
// import { Image } from '../core/Image'
import PostTitle from '../gatsby/Post/Title'
import styles from './PostTeaser.module.css'

export default function PostTeaser({
  post,
  toggleSearch,
  hideDate
}: {
  post: Queries.PostTeaserFragment
  toggleSearch?: () => void
  hideDate?: boolean
}): ReactElement {
  const { image, title, updated, date } = post.data

  return (
    <a
      className={styles.post}
      href={post.slug}
      onClick={toggleSearch && toggleSearch}
    >
      {/* {image ? (
        <Image
          image={(image as any).childImageSharp.gatsbyImageData}
          alt={title}
        />
      ) : (
        <span className={styles.empty} />
      )} */}

      <PostTitle
        title={title}
        date={hideDate ? null : date}
        updated={updated}
        className={styles.title}
      />
    </a>
  )
}
