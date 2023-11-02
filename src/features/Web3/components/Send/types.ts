export type SendFormData = {
  data: { hash: `0x${string}` }
  send: () => Promise<void>
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: Error | null
}
