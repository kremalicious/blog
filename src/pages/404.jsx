import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import styles from './404.module.scss'

const NotFound = ({ location }) => (
  <Layout location={location}>
    <div className={styles.hal9000} />

    <div className={styles.wrapper}>
      <h1 className={styles.title}>I am sorry Dave,</h1>
      <p className={styles.text}>I am afraid I can not do that.</p>

      <Link to={'/'}>Back to homepage</Link>
    </div>
  </Layout>
)

NotFound.propTypes = {
  location: PropTypes.object.isRequired
}

export default NotFound
