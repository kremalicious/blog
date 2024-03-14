import { forwardRef, type HTMLAttributes } from 'react'
import * as Select from '@radix-ui/react-select'
import { formatCurrency } from '@coingecko/cryptoformat'
import './Token.css'
import { Icon as Check } from '@images/components/react/Check'
import type { GetToken } from '@features/Web3/hooks/useFetchTokens'

interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
  token: GetToken | undefined
}

export const Token = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, token, ...props }, forwardedRef) => {
    const locale = window?.navigator?.language || 'en'
    const balance =
      token?.balance && token?.symbol
        ? formatCurrency(token.balance, token.symbol, locale, false, {
            decimalPlaces: 3,
            significantFigures: 3
          })
        : 0

    const valueInUsd =
      token?.balance && token?.price?.usd
        ? token?.balance * token?.price.usd
        : 0
    const valueInUsdFormatted = formatCurrency(valueInUsd, 'USD', locale)

    // const hasBalanceAndValue =
    //   balance && parseInt(balance) !== 0 && valueInUsd >= 1
    const hasBalance = balance && parseInt(balance) !== 0

    return hasBalance ? (
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
              <img
                src={token.logo}
                width="32"
                height="32"
                className="TokenLogoImage"
              />
            ) : (
              token?.symbol?.substring(0, 3)
            )}
            <img
              src={token?.chainLogo}
              width="20"
              height="20"
              className="TokenChainLogo"
            />
          </span>
        </Select.ItemText>
        <div>
          <h3 className="TokenName">{token?.name}</h3>
          <p className="TokenBalance">{balance}</p>
        </div>
        {valueInUsd ? (
          <div className="TokenValue">{valueInUsdFormatted}</div>
        ) : null}

        <Select.ItemIndicator className="SelectItemIndicator">
          <Check />
        </Select.ItemIndicator>
      </Select.Item>
    ) : null
  }
)
