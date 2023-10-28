import { forwardRef, type HTMLAttributes } from 'react'
import * as Select from '@radix-ui/react-select'
import { formatCurrency } from '@coingecko/cryptoformat'
import './Token.css'
import { Check } from '@images/components/react'
import type { GetToken } from '../../api/getTokens'

interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
  token: GetToken
}

export const Token = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, token, ...props }, forwardedRef) => {
    const balance =
      token.balance && token.symbol
        ? formatCurrency(token.balance, token.symbol, 'en', false, {
            decimalPlaces: 3,
            significantFigures: 3
          })
        : 0

    return balance && parseInt(balance) !== 0 ? (
      <Select.Item
        className={`${className} SelectItem`}
        {...props}
        value={token.address}
        title={token.address}
        ref={forwardedRef}
      >
        <div className="Token">
          <Select.ItemText>
            <img src={token.logo || ''} width="32" height="32" />
          </Select.ItemText>
          <div>
            <h3 className="TokenName">{token.name}</h3>
            <p className="TokenBalance">{balance}</p>
          </div>
        </div>
        <Select.ItemIndicator className="SelectItemIndicator">
          <Check />
        </Select.ItemIndicator>
      </Select.Item>
    ) : null
  }
)
