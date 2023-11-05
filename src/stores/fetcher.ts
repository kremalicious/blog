import { type Fetcher, nanoquery } from '@nanostores/query'

export const fetcher: Fetcher<unknown> = async (
  ...args: any[]
): Promise<unknown> => {
  const res = await fetch(args.join(''))
  return await res.json()
}

export const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher
})
