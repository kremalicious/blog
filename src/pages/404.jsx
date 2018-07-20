import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'

const NotFound = ({ location }) => (
  <Layout location={location}>
    <div className="hal-9000" />

    <p className="srverror-title">I am sorry Dave,</p>
    <p className="srverror-text">I am afraid I can not do that.</p>

    <a href="#" className="js-search-init">
      How about a nice search?
    </a>
  </Layout>
)

NotFound.propTypes = {
  location: PropTypes.object.isRequired
}

export default NotFound
