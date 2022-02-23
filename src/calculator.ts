const rxNumber = /^-?\d+(?:\.\d+)?$/

interface ParseOptions {
  delimiters?: string[]
}

export function calculate (numbers: number[]): number {
  return numbers.reduce((prev, curr) => {
    return prev + curr
  }, 0)
}

export function parse (input: string): number[] {
  const options: ParseOptions = {}
  if (options.delimiters === undefined) {
    options.delimiters = [',', '\\n', '\n']
  }

  // apply multiple delimiters
  let items: string[] = [input]
  options.delimiters.forEach(delimiter => {
    const newItems: string[] = []
    items.forEach(value => {
      newItems.push(...value.split(delimiter))
    })
    items = newItems
  })

  // convert string to numbers
  const numbers = items
    .map(value => {
      return rxNumber.test(value)
        ? +value
        : 0
    })

  return numbers
}
