import * as Select from '@radix-ui/react-select'
import './TokenSelect.css'
import { Token } from './Token'
import { ChevronDown, ChevronsDown, ChevronsUp } from '@images/components/react'
import { useTokens } from '../../hooks/useTokens'
import { TokenLoading } from './TokenLoading'

export function TokenSelect({
  setToken
}: {
  setToken: (token: string) => void
}) {
  const { data: tokens, isLoading } = useTokens()

  const items = tokens?.map((token) => (
    <Token key={token.address} token={token} />
  ))

  return tokens ? (
    <Select.Root
      defaultValue={tokens?.[0].address}
      onValueChange={(value) => setToken(value)}
      disabled={!tokens || isLoading}
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
  ) : null
}
