import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styles from './Image.module.scss'

const Image = props => (
  <Img
    className={styles.image}
    outerWrapperClassName={styles.imageWrap}
    backgroundColor="#6b7f88"
    fluid={props.fluid}
    alt={props.alt}
  />
)

Image.propTypes = {
  fluid: PropTypes.object.isRequired,
  alt: PropTypes.string
}

export const projectImage = graphql`
  fragment ImageFluid on ImageSharp {
    fluid(maxWidth: 940, quality: 85) {
      ...GatsbyImageSharpFluid_withWebp
    }
  }
`

export default Image
