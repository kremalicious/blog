export function normalizeAmount(amount: string): string {
  // Replace comma used as a decimal separator with a period
  let newAmount = amount.replace(',', '.')

  // Remove any non-digit or non-decimal characters
  newAmount = newAmount.replace(/[^\d.]/g, '')

  return newAmount
}
