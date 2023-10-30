import { nanoquery } from '@nanostores/query'

export const [
  createFetcherStore,
  createMutatorStore,
  { invalidateKeys, mutateCache }
] = nanoquery({
  fetcher: async (...keys: (string | number)[]) => {
    const response = await fetch(keys.join(''))
    return await response.json()
  }
})
