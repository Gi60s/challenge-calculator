#!/usr/bin/env node
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import readline from 'readline'
import { EOL } from 'os'
import { getOptions, run } from './cli'

const args = yargs(hideBin(process.argv)).argv
const { options, operator } = getOptions(args)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log(EOL + 'You can start this process with arguments now. Here are some examples:')
console.log('code-challenge --delimiter=foo --delimiter=X         This will add two new delimiters: foo and X')
console.log('code-challenge --allow-negative-number=true          This will allow negative numbers.')
console.log('code-challenge --maximum=5000                        This will change the maximum to 5000.')
console.log('code-challenge --operation=add                       This will set the operator to addition, the default.')
console.log('code-challenge --operation=subtract                  This will set the operator to subtraction.')
console.log('code-challenge --operation=multiply                  This will set the operator to subtraction.')
console.log('code-challenge --operation=divide                    This will set the operator to subtraction.')

console.log(EOL + 'Enter two numbers separated by a comma, then hit enter. Use Ctrl+C to exit.' + EOL)

process.stdout.write('> ')
rl.on('line', (input) => {
  try {
    const { formula, result } = run(input, options, operator)
    console.log('Formula: ' + formula)
    console.log('Result: ' + result + EOL)
    process.stdout.write('> ')
  } catch (e: any) {
    console.error((e.message ?? 'An unexpected error occurred') + EOL)
    process.stdout.write('> ')
  }
})
