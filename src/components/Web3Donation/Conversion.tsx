import React, { PureComponent } from 'react'
import { getFiat } from './utils'
import styles from './Conversion.module.scss'

export default class Conversion extends PureComponent<
  { amount: number },
  { euro: string; dollar: string }
> {
  state = {
    euro: '0.00',
    dollar: '0.00'
  }

  componentDidMount() {
    this.getFiatResponse()
  }

  componentDidUpdate(prevProps: any) {
    const { amount } = this.props

    if (amount !== prevProps.amount) {
      this.getFiatResponse()
    }
  }

  async getFiatResponse() {
    const { dollar, euro } = await getFiat(this.props.amount)
    this.setState({
      euro: euro,
      dollar: dollar
    })
  }

  render() {
    return (
      <div className={styles.conversion}>
        <span>
          {this.state.dollar !== '0.00' && `= $ ${this.state.dollar}`}
        </span>
        <span>{this.state.euro !== '0.00' && `= € ${this.state.euro}`}</span>
      </div>
    )
  }
}
