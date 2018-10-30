import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Input from '../atoms/Input'
import Account from './Account'
import Conversion from './Conversion'
import styles from './InputGroup.module.scss'

export default class InputGroup extends PureComponent {
  static propTypes = {
    amount: PropTypes.string.isRequired,
    onAmountChange: PropTypes.func.isRequired,
    sendTransaction: PropTypes.func.isRequired,
    selectedAccount: PropTypes.string
  }

  render() {
    const {
      amount,
      onAmountChange,
      sendTransaction,
      selectedAccount
    } = this.props

    return (
      <div className={styles.inputGroup}>
        <div className={styles.input}>
          <Input
            type="number"
            value={amount}
            onChange={onAmountChange}
            min="0"
            step="0.01"
          />
          <div className={styles.currency}>
            <span>ETH</span>
          </div>
        </div>
        <button className="btn btn-primary" onClick={sendTransaction}>
          Make it rain
        </button>
        <div className={styles.infoline}>
          <Conversion amount={amount} />
          {selectedAccount && <Account account={selectedAccount} />}
        </div>
      </div>
    )
  }
}
