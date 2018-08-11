import React, { PureComponent } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Container from '../atoms/Container'
import Twitter from '../svg/Twitter'
import Github from '../svg/Github'
import Facebook from '../svg/Facebook'
import Bitcoin from '../svg/Bitcoin'
import Rss from '../svg/Rss'
import Jsonfeed from '../svg/Jsonfeed'

import styles from './Footer.module.scss'

class Footer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { year: null }
  }

  componentDidMount() {
    const year = new Date().getFullYear()
    this.setState({ year })
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            contentYaml {
              author {
                name
                email
                uri
                twitter
                github
                facebook
                googleplus
                avatar {
                  childImageSharp {
                    fixed(width: 80, height: 80) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
                bitcoin
                ether
              }
            }
          }
        `}
        render={data => {
          const { author } = data.contentYaml

          return (
            <footer role="contentinfo" className={styles.footer}>
              <Container>
                <div className="vcard author">
                  <Img
                    className={styles.avatar}
                    fixed={author.avatar.childImageSharp.fixed}
                  />
                  <p className={styles.description}>
                    Blog of designer &amp; developer{' '}
                    <a className="fn" rel="author" href={author.uri}>
                      {author.name}
                    </a>
                  </p>

                  <p>
                    <a
                      className={styles.link}
                      href={`https://twitter.com/${author.twitter}`}
                    >
                      <Twitter className={styles.twitter} />
                    </a>
                    <a
                      className={styles.link}
                      href={`https://github.com/${author.github}`}
                    >
                      <Github className={styles.github} />
                    </a>
                    <a
                      className={styles.link}
                      href={`https://www.facebook.com/${author.facebook}`}
                    >
                      <Facebook className={styles.facebook} />
                    </a>
                  </p>
                </div>

                <aside className={styles.subscribe}>
                  <h1 className={styles.title}>Subscribe</h1>
                  <p>
                    <a
                      className={styles.link}
                      href="http://kremalicious.com/feed.xml"
                      title="RSS Feed"
                    >
                      <Rss className={styles.rss} />
                    </a>
                    <a
                      className={styles.link}
                      href="http://kremalicious.com/feed.json"
                      title="JSON Feed"
                    >
                      <Jsonfeed className={styles.json} />
                    </a>
                  </p>
                </aside>

                <section className={styles.copyright}>
                  <p>
                    &copy; 2005&ndash;
                    {this.state.year + ' '}
                    <a href="http://matthiaskretschmann.com" rel="me">
                      Matthias Kretschmann
                    </a>
                  </p>

                  <p>
                    <a href="https://github.com/kremalicious/kremalicious3/blob/master/_src/">
                      <Github />
                      View source
                    </a>
                    <a href="#" className={styles.btc}>
                      <Bitcoin />
                      <code>{author.bitcoin}</code>
                    </a>
                  </p>
                </section>
              </Container>
            </footer>
          )
        }}
      />
    )
  }
}

export default Footer
