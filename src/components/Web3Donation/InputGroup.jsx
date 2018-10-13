import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Input from '../atoms/Input'
import styles from './InputGroup.module.scss'

export default class InputGroup extends PureComponent {
  static propTypes = {
    networkId: PropTypes.string,
    selectedAccount: PropTypes.string,
    amount: PropTypes.number,
    onAmountChange: PropTypes.func,
    handleWeb3Button: PropTypes.func
  }

  render() {
    const {
      networkId,
      selectedAccount,
      amount,
      onAmountChange,
      handleWeb3Button
    } = this.props

    return (
      <div className={styles.inputGroup}>
        <div className={styles.input}>
          <Input
            type="number"
            disabled={!(networkId === '1') || !selectedAccount}
            value={amount}
            onChange={onAmountChange}
            min="0"
            step="0.01"
          />
          <div className={styles.currency}>
            <span>ETH</span>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleWeb3Button}
          disabled={!(networkId === '1') || !selectedAccount}
        >
          Make it rain
        </button>
      </div>
    )
  }
}
