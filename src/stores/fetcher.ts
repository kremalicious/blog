import { nanoquery } from '@nanostores/query'

export const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher: (...keys: (string | number)[]) =>
    fetch(keys.join('')).then((r) => r.json())
})
