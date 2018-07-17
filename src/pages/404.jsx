import React, { Fragment } from 'react'

const NotFound = () => (
  <Fragment>
    <div className="hal-9000" />

    <p className="srverror-title">I am sorry Dave,</p>
    <p className="srverror-text">I am afraid I can NotFound do that.</p>

    <a href="#" className="js-search-init">
      How about a nice search?
    </a>
  </Fragment>
)

export default NotFound
