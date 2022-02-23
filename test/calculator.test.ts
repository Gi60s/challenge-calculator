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

describe('command line interface', () => {
  test('it will accept one number', async () => {
    const result = await cli('1')
    expect(result).toEqual('1')
  })

  test('it will accept two numbers separated by a comma', async () => {
    const result = await cli('1,5')
    expect(result).toEqual('6')
  })

  test('it will accept a positive and a negative number', async () => {
    const result = await cli('4,-3')
    expect(result).toEqual('1')
  })

  test('it will accept two negative numbers', async () => {
    const result = await cli('-1,-3')
    expect(result).toEqual('-4')
  })

  test('it will return zero for empty input', async () => {
    const result = await cli('')
    expect(result).toEqual('0')
  })

  test('it will use zero for missing numbers', async () => {
    const result = await cli(',2')
    expect(result).toEqual('2')
  })

  test('it will use zero for invalid numbers', async () => {
    const result = await cli('5,tytyt')
    expect(result).toEqual('5')
  })

  test('it will allow numbers with decimals', async () => {
    const result = await cli('2.5,3.1')
    expect(result).toEqual('5.6')
  })

  test('it will allow more than two numbers', async () => {
    const result = await cli('1,2,3,4,5,6,7,8,9,10,11,12')
    expect(result).toEqual('78')
  })
})
