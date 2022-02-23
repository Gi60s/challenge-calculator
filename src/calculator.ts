const rxNumber = /^-?\d+(?:\.\d+)?$/

export const defaultParseMaximum = 1000
export const operators: Record<'add' | 'subtract' | 'multiply' | 'divide', Operator> = {
  add (numbers: number[]) {
    return numbers.reduce((prev, curr) => {
      return prev + curr
    }, 0)
  },
  subtract (numbers: number[]) {
    const value = numbers.reduce((prev: null | number, curr) => {
      return prev === null ? curr : prev - curr
    }, null)
    return value ?? 0
  },
  multiply (numbers: number[]) {
    const value = numbers.reduce((prev: null | number, curr) => {
      return prev === null ? curr : prev * curr
    }, null)
    return value ?? 0
  },
  divide (numbers: number[]) {
    const value = numbers.reduce((prev: null | number, curr) => {
      return prev === null ? curr : prev / curr
    }, null)
    return value ?? 0
  }
}

export interface ParseOptions {
  allowNegativeNumbers?: boolean
  delimiters?: string[]
  maximum?: number
}

export type Operator = (numbers: number[]) => number

export function calculate (numbers: number[], operator?: Operator): number {
  return operator !== undefined
    ? operator(numbers)
    : operators.add(numbers)
}

export function parse (input: string, options?: ParseOptions): number[] {
  if (options === undefined) options = {}

  // default delimiters that are always applied
  const delimiters: Set<string> = new Set(options.delimiters ?? [])
  delimiters.add(',')
  delimiters.add('\\n')
  delimiters.add('\n')

  // overwrite allow negative numbers and maximum
  const allowNegativeNumbers = !!options.allowNegativeNumbers
  const maximum = options.maximum ?? defaultParseMaximum

  // check for inline custom delimiters
  const rxInlineDelimiters = /^\/\/(.+)(?:\n|\\n)(.+)$/
  const matches = rxInlineDelimiters.exec(input)
  if (matches !== null) {
    const inlineDelimiter: string = matches[1]
    const length = inlineDelimiter.length
    if (length === 1) {
      delimiters.add(inlineDelimiter)
    } else if (inlineDelimiter.charAt(0) === '[' && inlineDelimiter.charAt(length-1) === ']') {
      inlineDelimiter.substring(1, length-1)
        .split('][')
        .forEach(inlineDelimiterItem => {
          delimiters.add(inlineDelimiterItem)
        })
    }
    input = matches[2]
  }

  // apply multiple delimiters
  const delimitersArray = Array.from(delimiters)
  delimitersArray.sort((a, b) => a.length < b.length ? 1 : -1)

  let items: string[] = [input]
  delimitersArray.forEach(delimiter => {
    const newItems: string[] = []
    items.forEach(value => {
      newItems.push(...value.split(delimiter))
    })
    items = newItems
  })

  // convert string to numbers
  const negativeNumbers: number[] = []
  const numbers = items
    .map(value => {
      let num = rxNumber.test(value)
        ? +value
        : 0
      if (num < 0 && !allowNegativeNumbers) negativeNumbers.push(num)
      if (num > maximum) num = 0
      return num
    })

  if (!allowNegativeNumbers && negativeNumbers.length > 0) {
    throw Error('Negative numbers not allowed: ' + negativeNumbers.join(', '))
  }

  return numbers
}
