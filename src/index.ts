#!/usr/bin/env node
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import readline from 'readline'
import { EOL } from 'os'
import { calculate, parse, ParseOptions } from './calculator'

const args = yargs(hideBin(process.argv)).argv
const options: ParseOptions = {
  allowNegativeNumbers: args.allowNegativeNumbers !== undefined,
  delimiters: Array.isArray(args.delimiter)
    ? args.delimiter
    : (args.delimiter !== undefined ? [args.delimiter] : [])
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('You can start this process with arguments now. Here are some examples:')
console.log('code-challenge --delimiter=foo --delimiter=X         This will add two new delimiters: foo and X')
console.log('code-challenge --allow-negative-number=true          This will allow negative numbers.')

console.log(EOL + 'Enter two numbers separated by a comma, then hit enter. Use Ctrl+C to exit.' + EOL)

process.stdout.write('> ')
rl.on('line', (input) => {
  try {
    const numbers = parse(input, options)
    const result = calculate(numbers)
    console.log('Result: ' + String(result) + EOL)
    process.stdout.write('> ')
  } catch (e: any) {
    console.error((e.message ?? 'An unexpected error occurred') + EOL)
    process.stdout.write('> ')
  }
})
