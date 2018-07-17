import React from 'react'
import Layout from '../components/Layout'

const NotFound = () => (
  <Layout location={location}>
    <div className="hal-9000" />

    <p className="srverror-title">I am sorry Dave,</p>
    <p className="srverror-text">I am afraid I can not do that.</p>

    <a href="#" className="js-search-init">
      How about a nice search?
    </a>
  </Layout>
)

export default NotFound
