import { type ReactElement, useState } from 'react'
// import PostTeaser from '@components/PostTeaser/index.astro'
import styles from './RelatedPosts.module.css'

export default function RelatedPosts({
  tags,
  isPhotos
}: {
  tags: string[]
  isPhotos?: boolean
}): ReactElement {
  const data = useStaticQuery<Queries.RelatedPostsQuery>(query)

  function getPosts() {
    const dataByType = isPhotos ? data.allPhotos.edges : data.allArticles.edges
    const posts = postsWithDataFilter(dataByType, 'tags', tags)

    return posts
  }

  const [filteredPosts, setFilteredPosts] = useState(getPosts())

  function refreshPosts() {
    const newPosts = getPosts()
    setFilteredPosts(newPosts)
  }

  return (
    <section className={styles.relatedPosts}>
      <h1 className={styles.title}>
        Related {isPhotos ? 'Photos' : 'Posts'}{' '}
        <button className={styles.button} onClick={() => refreshPosts()}>
          Refresh
        </button>
      </h1>
      <ul>
        {filteredPosts?.map(({ node }) => (
          <li key={node.id}>
            {/* {isPhotos ? (
              <PhotoThumb photo={node} />
            ) : (
              <PostTeaser post={node} hideDate />
            )} */}
          </li>
        ))}
      </ul>
    </section>
  )
}
