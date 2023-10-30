import * as Select from '@radix-ui/react-select'
import './TokenSelect.css'
import { Token } from './Token'
import { ChevronDown, ChevronsDown, ChevronsUp } from '@images/components/react'
import { TokenLoading } from './TokenLoading'
import { useEffect } from 'react'
import { useTokens } from '../../hooks/useTokens'
import { useAccount, useNetwork } from 'wagmi'
import { $selectedToken, $setSelectedToken } from '../../stores/selectedToken'
import { useStore } from '@nanostores/react'

export function TokenSelect() {
  const { data: tokens, isLoading: tokensIsLoading } = useTokens()
  const selectedToken = useStore($selectedToken)
  const { chain } = useNetwork()
  const { address } = useAccount()

  const items = tokens?.map((token) => (
    <Token key={token.address} token={token} />
  ))

  function handleValueChange(value: `0x${string}`) {
    const token = tokens?.find((token) => token.address === value)
    if (!token) return
    $setSelectedToken(token)
  }

  // Set default token data to first item,
  // which most of time is native token
  useEffect(() => {
    if (!chain?.id || !address || !tokens) return

    if (!selectedToken || !selectedToken?.address)
      handleValueChange(tokens[0].address)
  }, [chain?.id, address, tokens, selectedToken])

  return (
    <Select.Root
      defaultValue={selectedToken?.address}
      onValueChange={(value: `0x${string}`) => handleValueChange(value)}
      disabled={!tokens || tokensIsLoading}
      value={selectedToken?.address}
    >
      <Select.Trigger
        className="SelectTrigger"
        disabled={!tokens || tokensIsLoading}
        aria-label="Token"
      >
        {tokensIsLoading ? <TokenLoading /> : <Select.Value />}
        <Select.Icon>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal style={{ zIndex: 10 }}>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronsUp />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            <Select.Group>
              <Select.Label className="SelectLabel">
                In Your Wallet
              </Select.Label>
              {items}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronsDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
