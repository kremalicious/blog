import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'

import styles from './Page.module.scss'

const Page = ({ title, location, children }) => {
  return (
    <Layout location={location}>
      <h1 className={styles.pageTitle}>{title}</h1>
      {children}
    </Layout>
  )
}

Page.propTypes = {
  location: PropTypes.object,
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
}

export default Page
