const rxNumber = /^-?\d+(?:\.\d+)?$/

export function calculate (numbers: number[]): number {
  return numbers.reduce((prev, curr) => {
    return prev + curr
  }, 0)
}

export function parse (input: string): number[] {
  // convert string to numbers
  const numbers = input.split(',')
    .map(value => {
      return rxNumber.test(value)
        ? +value
        : 0
    })

  return numbers
}
