import * as Select from '@radix-ui/react-select'
import './TokenSelect.css'
import { Token } from './Token'
import { Icon as ChevronDown } from '@images/components/react/ChevronDown'
import { Icon as ChevronsDown } from '@images/components/react/ChevronsDown'
import { Icon as ChevronsUp } from '@images/components/react/ChevronsUp'
import { useFetchTokens } from '@features/Web3/hooks/useFetchTokens'
import { useStore } from '@nanostores/react'
import { $selectedToken, $setSelectedToken } from '@features/Web3/stores'
import { Loader } from '@components/Loader'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'

export function TokenSelect() {
  const { address } = useAccount()
  const { data: tokens, isLoading } = useFetchTokens()
  const selectedToken = useStore($selectedToken)

  const items = tokens?.map((token) => (
    <Token key={token.address} token={token} />
  ))

  function handleValueChange(value: `0x${string}`) {
    const token = tokens?.find((token) => token.address === value)
    if (!token) return

    $setSelectedToken(token)
  }

  // Auto-select native token
  // when no selection was made yet
  useEffect(() => {
    if (selectedToken?.address || !tokens || !tokens?.length) return

    handleValueChange('0x0')
  }, [tokens, selectedToken])

  return tokens && address ? (
    <Select.Root
      defaultValue={selectedToken?.address || tokens[0].address}
      value={selectedToken?.address}
      onValueChange={(value: `0x${string}`) => handleValueChange(value)}
      disabled={isLoading}
    >
      <Select.Trigger
        className="SelectTrigger"
        disabled={isLoading}
        aria-label="Token"
      >
        <Select.Value placeholder="..." />
        <Select.Icon>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>

      {/* @ts-expect-error-next-line: style actually is passed through and is needed in our case */}
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
  ) : isLoading ? (
    <div className="Token">
      <div className="TokenLogo TokenLoading">
        <Loader />
      </div>
    </div>
  ) : null
}
