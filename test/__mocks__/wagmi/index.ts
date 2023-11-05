import { vi } from 'vitest'

const mainnet = {
  id: 1,
  network: 'homestead',
  name: 'Ethereum',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    alchemy: { http: [Array], webSocket: [Array] },
    infura: { http: [Array], webSocket: [Array] },
    default: { http: [Array] },
    public: { http: [Array] }
  },
  blockExplorers: {
    etherscan: { name: 'Etherscan', url: 'https://etherscan.io' },
    default: { name: 'Etherscan', url: 'https://etherscan.io' }
  },
  contracts: {
    ensRegistry: { address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' },
    ensUniversalResolver: {
      address: '0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62',
      blockCreated: 16966585
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 14353601
    }
  },
  fees: undefined,
  formatters: undefined,
  serializers: undefined
}

export function useNetwork() {
  return {
    chain: mainnet
  }
}

export function useAccount() {
  return {
    address: '0x0000000000000000000000000000000000000000'
  }
}

export function usePrepareSendTransaction() {
  return {
    data: {
      address: '0x0000000000000000000000000000000000000000'
    }
  }
}

export function usePrepareContractWrite() {
  return {
    config: {}
  }
}

export function useSendTransaction() {
  return {
    sendTransactionAsync: () => null,
    isError: undefined,
    isSuccess: undefined
  }
}

export function useContractWrite() {
  return {
    writeAsync: () => null,
    isLoading: false,
    isError: undefined,
    isSuccess: undefined
  }
}

export function useEnsAvatar() {
  return {
    data: 'xxx.jpg'
  }
}

export function useEnsName() {
  return {
    data: 'fguhifgvewtyifgwyufew.eth'
  }
}

export function useEnsAddress() {
  return {
    data: '0x0000000000000000000000000000000000000000'
  }
}

export function useBalance() {
  return {
    data: { formatted: '0.22', symbol: 'ETH' }
  }
}

export function useConnect() {
  return {
    connect: vi.fn()
  }
}

export function useDisconnect() {
  return {
    disconnect: vi.fn()
  }
}

export function useProvider() {
  return {}
}

export const chain = mainnet

export function createClient() {
  return {
    queryClient: {
      mount: vi.fn(),
      unmount: vi.fn()
    }
  }
}
