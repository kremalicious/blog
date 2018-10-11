import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Container from '../atoms/Container'
import styles from './SearchResults.module.scss'

const SearchResults = ({ results, onClose }) =>
  ReactDOM.createPortal(
    <div className={styles.searchResults}>
      <Container>
        <ul>
          {results.map(page => (
            <li key={page.url}>
              <Link to={page.url} onClick={onClose}>
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>,
    document.getElementById('document')
  )

SearchResults.propTypes = {
  results: PropTypes.array.isRequired
}

export default SearchResults
