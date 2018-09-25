/* global CoinHive */

import React, { PureComponent } from 'react'
import loadScript from 'load-script'
import posed, { PoseGroup } from 'react-pose'
import { fadeIn } from './Transitions'
import styles from './Coinhive.module.scss'

const config = {
  threads: 2,
  throttle: 0.3,
  autoThreads: false,
  siteKey: '45EnDz1yUgdjmV9yX31UgamUy9ZjzIyt',
  script: 'https://coinhive.com/lib/coinhive.min.js'
}

const Animation = posed.div(fadeIn)

export default class CoinHiveClient extends PureComponent {
  state = {
    miner: null,
    hashrate: 0,
    started: false,
    intervalId: null
  }

  intervalId = null

  buildMiner = () => {
    if (this.state.miner && this.state.miner.isRunning()) {
      this.stop()
    }

    return new Promise(resolve => {
      loadScript(config.script, error => {
        if (error) {
          return
        }
        resolve(
          CoinHive.Anonymous(config.siteKey, {
            throttle: config.throttle,
            threads: config.threads,
            autoThreads: config.autoThreads
          })
        )
      })
    })
  }

  componentDidMount() {
    this.buildMiner()
      .then(miner => {
        this.setState({ miner })

        if (this.state.miner && !this.state.miner.isMobile()) {
          this.start()
          this.report()
        }
      })
      .catch(() => null)
  }

  componentWillUnmount() {
    this.destroy()
  }

  start() {
    this.state.miner.start()
    this.setState({ started: true })
  }

  stop() {
    this.state.miner.stop()
    this.setState({ started: false })
  }

  destroy() {
    if (!this.state.miner) return

    this.state.miner.stop()
    delete this.state.miner
    clearInterval(this.state.intervalId)
  }

  hashrate() {
    return this.state.miner.getHashesPerSecond().toFixed(2)
  }

  report() {
    if (!this.state.miner) return

    let intervalId = setInterval(
      () => this.setState({ hashrate: this.hashrate() }),
      1500
    )
    this.setState({ intervalId })
  }

  toggleMiner = () => {
    if (this.state.started) {
      this.stop()
    } else {
      this.start()
    }
  }

  render() {
    return (
      this.state.miner && (
        <PoseGroup animateOnMount={true}>
          <Animation
            key="coinhive"
            className={styles.coinhive}
            onClick={this.toggleMiner}
          >
            <div title="Toggle mining">
              Mining {this.state.started ? 'enabled' : 'disabled'}
            </div>
            <div className={styles.hashrate}>
              {this.state.hashrate} Hashes/s
            </div>
          </Animation>
        </PoseGroup>
      )
    )
  }
}
