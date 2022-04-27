export function isAmountValid(amount) {
  if (typeof amount !== 'number') {
    return new Error('amount must be a number')
  }

  if (amount < 0) {
    return new Error('amount must be greater than 0')
  }

  return
}

export function isCurrencyValid(currency) {
  if (!currency) {
    return new Error('must provide currency')
  }

  if (typeof currency !== 'string') {
    return new Error('amount must be a string')
  }

  if (currency.length !== '3') {
    return new Error('currency must be in ISO format')
  }

  return
}