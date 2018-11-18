import React, { PureComponent } from 'react'
import Input from '../atoms/Input'
import styles from './SearchInput.module.scss'

export default class SearchInput extends PureComponent {
  render() {
    return (
      <>
        <Input
          className={styles.searchInput}
          type="search"
          placeholder="Search everything"
          autoFocus // eslint-disable-line
          {...this.props}
        />
        <button
          className={styles.searchInputClose}
          onClick={this.props.onToggle}
          title="Close search"
        >
          &times;
        </button>
      </>
    )
  }
}
