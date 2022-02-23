const rxNumber = /^-?\d+(?:\.\d+)?$/

export interface ParseOptions {
  delimiters?: string[]
}

export function calculate (numbers: number[]): number {
  return numbers.reduce((prev, curr) => {
    return prev + curr
  }, 0)
}

export function parse (input: string, options?: ParseOptions): number[] {
  if (options === undefined) options = {}

  const delimiters: Set<string> = new Set(options.delimiters ?? [])
  delimiters.add(',')
  delimiters.add('\\n')
  delimiters.add('\n')

  // apply multiple delimiters
  let items: string[] = [input]
  Array.from(delimiters).forEach(delimiter => {
    const newItems: string[] = []
    items.forEach(value => {
      newItems.push(...value.split(delimiter))
    })
    items = newItems
  })
  items.sort((a, b) => a.length < b.length ? -1 : 1)

  // convert string to numbers
  const numbers = items
    .map(value => {
      return rxNumber.test(value)
        ? +value
        : 0
    })

  return numbers
}
