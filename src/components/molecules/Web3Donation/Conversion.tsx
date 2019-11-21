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
    try {
      const { dollar, euro } = await getFiat(this.props.amount)
      this.setState({ euro, dollar })
    } catch (error) {
      console.error(error.message)
    }
  }

  render() {
    const { dollar, euro } = this.state

    return (
      <div className={styles.conversion}>
        <span>{dollar !== '0.00' && `= $ ${dollar}`}</span>
        <span>{euro !== '0.00' && `= € ${euro}`}</span>
      </div>
    )
  }
}
