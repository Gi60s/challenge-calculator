import { calculate, defaultParseMaximum, operators, Operator, parse, ParseOptions } from './calculator'

export function getOptions (args: any): { operator: Operator, options: ParseOptions } {
  // set parse options based on command line args
  const options: Required<ParseOptions> = {
    allowNegativeNumbers: args.allowNegativeNumbers !== undefined,
    delimiters: Array.isArray(args.delimiter)
      ? args.delimiter
      : (args.delimiter !== undefined ? [args.delimiter] : []),
    maximum: +lastArg(args.maximum, '1000')
  }
  if (isNaN(options.maximum)) options.maximum = defaultParseMaximum

  // set operation based on command line args
  let operator: Operator
  switch (lastArg(args.operation, 'add')) {
    case 'subtract':
      operator = operators.subtract
      break
    case 'multiply':
      operator = operators.multiply
      break
    case 'divide':
      operator = operators.divide
      break
    case 'add':
    default:
      operator = operators.add
  }

  return {
    options,
    operator
  }
}

export function run (input: string, options: ParseOptions, operator: Operator): { formula: string, result: string } {
  const numbers = parse(input, options)
  const result = calculate(numbers, operator)

  let opSign: string = '+'
  if (operator === operators.subtract) opSign = '-'
  if (operator === operators.multiply) opSign = '*'
  if (operator === operators.divide) opSign = '/'

  return {
    formula: numbers.join(opSign) + ' = ' + String(result),
    result: String(result)
  }
}

function lastArg (arg: any, defaultValue: string): string {
  if (arg === undefined) return defaultValue
  if (Array.isArray(arg)) return arg[arg.length - 1]
  return arg
}





