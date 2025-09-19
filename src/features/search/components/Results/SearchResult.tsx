import type { SearchResultItem } from '@/features/search/types'
import styles from './SearchResult.module.css'

export function SearchResult({ post }: { post: SearchResultItem }) {
  const { title, slug } = post.data
  const image = post.thumbImage
  const classNames = `${styles.image} ${image ? '' : styles.empty} ${styles[post.collection]}`

  return (
    <a className={styles.post} href={`/${slug}/`}>
      <figure className={classNames}>
        {image && (
          <img
            src={image.src}
            width={image.options.width}
            height={image.options.height}
            alt={title}
          />
        )}
      </figure>

      <h3 className={styles.title}>{title}</h3>
    </a>
  )
}
