import * as Select from '@radix-ui/react-select'
import './TokenSelect.css'
import { Token } from './Token'
import { ChevronDown, ChevronsDown, ChevronsUp } from '@images/components/react'
import { TokenLoading } from './TokenLoading'
import { useTokens } from '@features/Web3/hooks/useTokens'

export function TokenSelect() {
  const {
    data: tokens,
    isLoading,
    selectedToken,
    setSelectedToken
  } = useTokens()

  const items = tokens?.map((token) => (
    <Token key={token.address} token={token} />
  ))

  function handleValueChange(value: `0x${string}`) {
    const token = tokens?.find((token) => token.address === value)
    if (!token) return
    setSelectedToken(token)
  }

  return (
    <Select.Root
      defaultValue={selectedToken?.address}
      onValueChange={(value: `0x${string}`) => handleValueChange(value)}
      disabled={!tokens || isLoading}
      value={selectedToken?.address}
    >
      <Select.Trigger
        className="SelectTrigger"
        disabled={!tokens || isLoading}
        aria-label="Token"
      >
        {isLoading ? <TokenLoading /> : <Select.Value />}
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
