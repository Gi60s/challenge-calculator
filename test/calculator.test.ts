import { calculate, parse } from '../src/calculator'
import { cli } from './cli-helper'

describe('parse', () => {
  test('it will parse a single number', () => {
    const numbers = parse('20')
    expect(numbers).toEqual([20])
  })

  test('it will parse two numbers separated by a comma', () => {
    const numbers = parse('1,5000')
    expect(numbers).toEqual([1, 5000])
  })

  test('it will allow negative numbers', () => {
    const numbers = parse('4,-3')
    expect(numbers).toEqual([4, -3])
  })

  test('it will use zero for empty input', () => {
    const numbers = parse('')
    expect(numbers).toEqual([0])
  })

  test('it will use zero for missing numbers', () => {
    const numbers = parse(',2')
    expect(numbers).toEqual([0, 2])
  })

  test('it will use zero for invalid numbers', () => {
    const numbers = parse('5,tytyt')
    expect(numbers).toEqual([5, 0])
  })

  test('it will allow numbers with decimals', () => {
    const numbers = parse('2.5,3.1')
    expect(numbers).toEqual([2.5, 3.1])
  })

  test('it can use newline for delimiter', () => {
    expect(parse('1\n2,3')).toEqual([1,2,3])
  })
})

describe('calculate', () => {
  test('it will calculate a single number', () => {
    expect(calculate([20])).toEqual(20)
  })

  test('it will calculate two numbers separated by a comma', () => {
    expect(calculate([1,5000])).toEqual(5001)
  })

  test('it will calculate negative numbers', () => {
    expect(calculate([4,-3])).toEqual(1)
  })

  test('it will calculate numbers with decimals', () => {
    expect(calculate([2.5, 3.1])).toEqual(5.6)
  })
})
