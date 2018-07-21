import React from 'react'
import PropTypes from 'prop-types'
import styles from './Container.module.scss'

const Container = ({ children }) => (
  <section className={styles.container}>{children}</section>
)

Container.propTypes = {
  children: PropTypes.any.isRequired
}

export default Container
