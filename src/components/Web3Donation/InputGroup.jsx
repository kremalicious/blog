import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Input from '../atoms/Input'
import Account from './Account'
import Conversion from './Conversion'
import styles from './InputGroup.module.scss'

export default class InputGroup extends PureComponent {
  static propTypes = {
    hasCorrectNetwork: PropTypes.bool.isRequired,
    hasAccount: PropTypes.bool.isRequired,
    amount: PropTypes.string.isRequired,
    onAmountChange: PropTypes.func.isRequired,
    handleButton: PropTypes.func.isRequired,
    selectedAccount: PropTypes.string
  }

  render() {
    const {
      hasCorrectNetwork,
      hasAccount,
      amount,
      onAmountChange,
      handleButton,
      selectedAccount
    } = this.props

    return (
      <div className={styles.inputGroup}>
        <div className={styles.input}>
          <Input
            type="number"
            disabled={!hasCorrectNetwork || !hasAccount}
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
          onClick={handleButton}
          disabled={!hasCorrectNetwork || !hasAccount}
        >
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
