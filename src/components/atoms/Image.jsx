import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styles from './Image.module.scss'

export default class Image extends PureComponent {
  static propTypes = {
    fluid: PropTypes.object,
    fixed: PropTypes.object,
    alt: PropTypes.string.isRequired
  }

  render() {
    const { fluid, fixed, alt } = this.props

    return (
      <Img
        className={styles.imageWrap}
        backgroundColor="#dfe8ef"
        fluid={fluid ? fluid : null}
        fixed={fixed ? fixed : null}
        alt={alt}
      />
    )
  }
}

export const imageSizeDefault = graphql`
  fragment ImageFluid on ImageSharp {
    fluid(maxWidth: 940, quality: 85) {
      ...GatsbyImageSharpFluid_withWebp_noBase64
    }
  }
`

export const imageSizeThumb = graphql`
  fragment ImageFluidThumb on ImageSharp {
    fluid(maxWidth: 200, maxHeight: 85, quality: 85, cropFocus: CENTER) {
      ...GatsbyImageSharpFluid_withWebp_noBase64
    }
  }
`
