import React, { PureComponent } from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Container from '../atoms/Container'
import Vcard from '../molecules/Vcard'
import Subscribe from '../molecules/Subscribe'
import ModalThanks from '../molecules/ModalThanks'

import { ReactComponent as Github } from '../../images/github.svg'
import { ReactComponent as Bitcoin } from '../../images/bitcoin.svg'

import styles from './Footer.module.scss'

const query = graphql`
  query {
    contentYaml {
      author {
        name
        uri
        bitcoin
        github
      }
    }
  }
`

export default class Footer extends PureComponent {
  state = {
    year: null,
    showModal: false
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  componentDidMount() {
    const year = new Date().getFullYear()
    this.setState({ year })
  }

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const { name, uri, bitcoin, github } = data.contentYaml.author

          return (
            <footer role="contentinfo" className={styles.footer}>
              <Container>
                <Vcard />
                <Subscribe />

                <section className={styles.copyright}>
                  <p>
                    &copy; 2005&ndash;
                    {this.state.year + ' '}
                    <a href={uri} rel="me">
                      {name}
                    </a>
                  </p>

                  <p>
                    <a href={`${github}/blog`}>
                      <Github />
                      View source
                    </a>
                    <a
                      href="#"
                      className={styles.btc}
                      onClick={this.toggleModal}
                    >
                      <Bitcoin />
                      <code>{bitcoin}</code>
                    </a>
                  </p>

                  <ModalThanks
                    isOpen={this.state.showModal}
                    handleCloseModal={this.toggleModal}
                  />
                </section>
              </Container>
            </footer>
          )
        }}
      />
    )
  }
}
