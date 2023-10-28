import { forwardRef, type HTMLAttributes } from 'react'
import * as Select from '@radix-ui/react-select'
import { formatCurrency } from '@coingecko/cryptoformat'
import './Token.css'
import { Check } from '@images/components/react'
import type { GetToken } from '../../api/getTokens'

interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
  token: GetToken | undefined
}

export const Token = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, token, ...props }, forwardedRef) => {
    const balance =
      token?.balance && token?.symbol
        ? formatCurrency(token.balance, token.symbol, 'en', false, {
            decimalPlaces: 3,
            significantFigures: 3
          })
        : 0

    const valueInUsd =
      token?.balance && token?.price?.usd
        ? token?.balance * token?.price.usd
        : 0
    const valueInUsdFormatted = formatCurrency(valueInUsd, 'USD', 'en')

    return balance && parseInt(balance) !== 0 && valueInUsd >= 1 ? (
      <Select.Item
        className={`${className ? className : ''} Token`}
        {...props}
        value={token?.address || ''}
        title={token?.address}
        ref={forwardedRef}
      >
        <Select.ItemText>
          <span className="TokenLogo">
            {token?.logo ? (
              <img src={token.logo} width="32" height="32" />
            ) : (
              token?.symbol?.substring(0, 3)
            )}
          </span>
        </Select.ItemText>
        <div>
          <h3 className="TokenName">{token?.name}</h3>
          <p className="TokenBalance">{balance}</p>
        </div>
        <div className="TokenValue">{valueInUsdFormatted}</div>

        <Select.ItemIndicator className="SelectItemIndicator">
          <Check />
        </Select.ItemIndicator>
      </Select.Item>
    ) : null
  }
)
