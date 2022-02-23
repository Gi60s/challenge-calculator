import readline from 'readline'
import { EOL } from 'os'
import { calculate, parse } from './calculator'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('Enter two numbers separated by a comma, then hit enter. Use Ctrl+C to exit.' + EOL)

process.stdout.write('> ')
rl.on('line', (input) => {
  try {
    const numbers = parse(input)
    const result = calculate(numbers)
    console.log('Result: ' + String(result) + EOL)
    process.stdout.write('> ')
  } catch (e: any) {
    console.error((e.message ?? 'An unexpected error occurred') + EOL)
    process.stdout.write('> ')
  }
})
