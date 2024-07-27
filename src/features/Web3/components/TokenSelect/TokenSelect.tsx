import * as Select from '@radix-ui/react-select'
import './TokenSelect.css'
import { Loader } from '@components/Loader'
import { useFetchTokens } from '@features/Web3/hooks/useFetchTokens'
import { $selectedToken } from '@features/Web3/stores'
import { Icon as ChevronDown } from '@images/components/react/ChevronDown'
import { Icon as ChevronsDown } from '@images/components/react/ChevronsDown'
import { Icon as ChevronsUp } from '@images/components/react/ChevronsUp'
import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Token } from './Token'

export function TokenSelect() {
  const { address } = useAccount()
  const { data: tokens, isLoading } = useFetchTokens()
  const selectedToken = useStore($selectedToken)

  const items = tokens?.map((token) => (
    <Token key={`${token.address}-${token.chainId}`} token={token} />
  ))

  function handleValueChange(value: `0x${string}`) {
    const token = tokens?.find((token) => token.address === value)
    if (!token) return

    $selectedToken.set(token)
  }

  // Auto-select native token
  // when no selection was made yet
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (selectedToken?.address || !tokens || !tokens?.length) return

    // select ETH mainnet token
    handleValueChange('0x0-1')
  }, [tokens, selectedToken])

  return tokens && address ? (
    <Select.Root
      value={selectedToken?.address}
      onValueChange={(value: `0x${string}`) => handleValueChange(value)}
      disabled={isLoading}
      name="selectedToken"
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

      <Select.Content className="SelectContent">
        <Select.ScrollUpButton className="SelectScrollButton">
          <ChevronsUp />
        </Select.ScrollUpButton>
        <Select.Viewport className="SelectViewport">
          <Select.Group>
            <Select.Label className="SelectLabel">In Your Wallet</Select.Label>
            {items}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="SelectScrollButton">
          <ChevronsDown />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Root>
  ) : isLoading ? (
    <div className="Token">
      <div className="TokenLogo TokenLoading">
        <Loader />
      </div>
    </div>
  ) : null
}
