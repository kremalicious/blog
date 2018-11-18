import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Image from '../atoms/Image'
import styles from './PostTeaser.module.scss'

export default class PostTeaser extends PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired,
    toggleSearch: PropTypes.func
  }

  render() {
    const { post, toggleSearch } = this.props

    return (
      <li>
        <Link to={post.fields.slug} onClick={toggleSearch && toggleSearch}>
          {post.frontmatter.image ? (
            <>
              <Image
                fluid={post.frontmatter.image.childImageSharp.fluid}
                alt={post.frontmatter.title}
              />
              <h4 className={styles.postTitle}>{post.frontmatter.title}</h4>
            </>
          ) : (
            <div className={styles.empty}>
              <h4 className={styles.postTitle}>{post.frontmatter.title}</h4>
            </div>
          )}
        </Link>
      </li>
    )
  }
}
