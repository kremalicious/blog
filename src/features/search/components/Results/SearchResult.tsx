import type { SearchResultItem } from '../../types'
import styles from './SearchResults.module.css'

export function SearchResult({ post }: { post: SearchResultItem }) {
  const { title, slug } = post.data
  // const image = (post.data as ArticlePost['data'] | PhotoPost['data']).image

  // let finalImage: GetImageResult | undefined
  // if (image) {
  //   finalImage = await getImage({
  //     src: image,
  //     width: 100,
  //     height: 100
  //   })
  // }

  return (
    <li>
      <a className={styles.post} href={`/${slug}/`}>
        {/* {finalImage && <img src={finalImage.src} alt={title} />} */}
        <h3 className={styles.title}>{title}</h3>
      </a>
    </li>
  )
}
