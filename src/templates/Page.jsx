import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'

import styles from './Page.module.scss'

const Page = ({ title, location, section, children }) => {
  return (
    <Layout location={location}>
      <h1 className={styles.pageTitle}>{title}</h1>
      {section ? <section className={section}>{children}</section> : children}
    </Layout>
  )
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  section: PropTypes.string,
  location: PropTypes.object
}

export default Page
