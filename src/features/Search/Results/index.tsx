import type { ReactElement } from 'react'
import { createPortal } from 'react-dom'
import type { Post } from '../Search'
import ResultsEmpty from './Empty'
import styles from './index.module.css'

function SearchResultsPure({
  query,
  results
}: {
  results: Post[] | undefined
  query: string
}) {
  return (
    <div className={styles.searchResults}>
      {results && results.length > 0 ? (
        <ul className={styles.results}>
          {results.map((post) => (
            <li key={post.slug}>
              <a className={styles.post} href={`/${post.slug}/`}>
                {/* {post.data.image && (
                  <img src={post.data.image.src} alt={post.data.title} />
                )} */}
                <h3 className={styles.title}>{post.data.title}</h3>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <ResultsEmpty query={query} results={results} />
      )}
    </div>
  )
}

export default function SearchResults({
  query,
  results
}: {
  query: string
  results: Post[] | undefined
}): ReactElement {
  // creating portal to break out of DOM node we're in
  // and render the results in content container
  return createPortal(
    <SearchResultsPure results={results} query={query} />,
    document.querySelector('#document') as Element
  )
}
