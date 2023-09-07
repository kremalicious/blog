import type { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import styles from './index.module.css'
import ResultsEmpty from './Empty'
import type { Post } from '../Search'

function SearchResultsPure({
  query,
  results
}: {
  results: Post[]
  query: string
}) {
  return (
    <div className={styles.searchResults}>
      {results.length > 0 ? (
        <ul className={styles.results}>
          {results.map((post) => (
            <li key={post.slug}>
              <h3>
                <a href={post.slug}>{post.data.title}</a>
              </h3>
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
  results: Post[]
}): ReactElement {
  // creating portal to break out of DOM node we're in
  // and render the results in content container
  return ReactDOM.createPortal(
    <SearchResultsPure results={results} query={query} />,
    document.querySelector('#document') as Element
  )
}
