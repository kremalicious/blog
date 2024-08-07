const terribleErrorMessages = [
  'User rejected the request',
  'User denied transaction signature',
  'Cannot read properties of undefined',
  'User cancelled the request'
]

export function isUnhelpfulErrorMessage(message: string) {
  return terribleErrorMessages.some((terribleMessage) =>
    message.includes(terribleMessage)
  )
}
