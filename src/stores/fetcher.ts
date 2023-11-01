import { nanoquery } from '@nanostores/query'

export async function fetcher(...args: (string | number)[]) {
  const res = await fetch(args.join(''))
  return await res.json()
}

export const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher
})
