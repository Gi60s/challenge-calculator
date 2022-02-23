import { calculate, defaultParseMaximum, operators, parse } from '../src/calculator'
import { getOptions, run } from '../src/cli'

describe('parse', () => {
  test('it will parse a single number', () => {
    const numbers = parse('20')
    expect(numbers).toEqual([20])
  })

  test('it will parse two numbers separated by a comma', () => {
    const numbers = parse('1,5000', { maximum: 10000 })
    expect(numbers).toEqual([1, 5000])
  })

  test('it has a default maximum of 1000', () => {
    const numbers = parse('1,5000')
    expect(numbers).toEqual([1, 0])
  })

  test('it will not allow negative numbers', () => {
    expect(() => parse('4,-3,-7')).toThrow(/Negative numbers not allowed: -3, -7/)
  })

  it('can add the option to include negative numbers', () => {
    const numbers = parse('4,-3,-7', { allowNegativeNumbers: true })
    expect(numbers).toEqual([4, -3, -7])
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

  test('it can have additional delimiters', () => {
    const delimiters = ['foo', 'bar']
    expect(parse('1\n2,3foo4bar5', { delimiters })).toEqual([1,2,3,4,5])
  })

  test('it can have a single character inline delimiter (x)', () => {
    expect(parse('//x\n1x2')).toEqual([1, 2])
  })

  test('it can have a single character inline delimiter (#)', () => {
    expect(parse('//#\n2#5')).toEqual([2, 5])
  })

  test('it can have a single character inline delimiter (,)', () => {
    expect(parse('//,\n2,ff,100')).toEqual([2, 0, 100])
  })

  test('it can have a single multi-character inline delimiter (***)', () => {
    expect(parse('//[***]\n11***22***33')).toEqual([11, 22, 33])
  })

  test('it can have a multiple multi-character inline delimiters', () => {
    expect(parse('//[*][!!][r9r]\\n11r9r22*hh*33!!44')).toEqual([11, 22, 0, 33, 44])
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

  test('it can use subtraction', () => {
    expect(calculate([8,4,2], operators.subtract)).toEqual(2)
  })

  test('it can use multiplication', () => {
    expect(calculate([2,4,3], operators.multiply)).toEqual(24)
  })

  test('it can use division', () => {
    expect(calculate([20,2,5], operators.divide)).toEqual(2)
  })
})

describe('cli', () => {
  describe('delimiters', () => {
    test('it can handle no delimiters', () => {
      const { options } = getOptions({})
      expect(options.delimiters).toEqual([])
    })

    test('it can handle one delimiter', () => {
      const { options } = getOptions({ delimiter: 'hello' })
      expect(options.delimiters).toEqual(['hello'])
    })

    test('it can handle multiple delimiters', () => {
      const { options } = getOptions({ delimiter: ['x', 'y']})
      expect(options.delimiters).toEqual(['x', 'y'])
    })
  })

  describe('allow negative number', () => {
    test('it can handle absence of allowNegativeNumber', () => {
      const { options } = getOptions({})
      expect(options.allowNegativeNumbers).toEqual(false)
    })

    test('inclusion of allowNegativeNumbers results in true', () => {
      const { options } = getOptions({ allowNegativeNumbers: false })
      expect(options.allowNegativeNumbers).toEqual(true)
    })
  })

  describe('maximum', function () {
    test('it can handle absence of maximum', () => {
      const { options } = getOptions({})
      expect(options.maximum).toEqual(defaultParseMaximum)
    })

    test('it can handle one maximum', () => {
      const { options } = getOptions({ maximum: '5000' })
      expect(options.maximum).toEqual(5000)
    })

    test('it can handle multiple maximums', () => {
      const { options } = getOptions({ maximum: ['5000', '50'] })
      expect(options.maximum).toEqual(50)
    })
  });

  describe('operation', function () {
    test('it can handle absence of operation', () => {
      const { operator } = getOptions({})
      expect(operator).toEqual(operators.add)
    })

    test('it can handle one operation', () => {
      const { operator } = getOptions({ operation: 'subtract' })
      expect(operator).toEqual(operators.subtract)
    })

    test('it can handle multiple operations', () => {
      const { operator } = getOptions({ operation: ['subtract', 'multiply'] })
      expect(operator).toEqual(operators.multiply)
    })

    test('it can get add operator', () => {
      const { operator } = getOptions({ operation: 'add' })
      expect(operator).toEqual(operators.add)
    })

    test('it can get subtract operator', () => {
      const { operator } = getOptions({ operation: 'subtract' })
      expect(operator).toEqual(operators.subtract)
    })

    test('it can get multiply operator', () => {
      const { operator } = getOptions({ operation: 'multiply' })
      expect(operator).toEqual(operators.multiply)
    })

    test('it can get divide operator', () => {
      const { operator } = getOptions({ operation: 'divide' })
      expect(operator).toEqual(operators.divide)
    })

    test('it will fall back to add operator', () => {
      const { operator } = getOptions({ operation: 'something-else' })
      expect(operator).toEqual(operators.add)
    })
  });

  describe('run', () => {
    test('it can run addition', () => {
      const { formula, result } = run('1,2', {}, operators.add)
      expect(formula).toEqual('1+2 = 3')
      expect(result).toEqual('3')
    })

    test('it can run subtraction', () => {
      const { formula, result } = run('1,2', {}, operators.subtract)
      expect(formula).toEqual('1-2 = -1')
      expect(result).toEqual('-1')
    })

    test('it can run multiplication', () => {
      const { formula, result } = run('1,2', {}, operators.multiply)
      expect(formula).toEqual('1*2 = 2')
      expect(result).toEqual('2')
    })

    test('it can run division', () => {
      const { formula, result } = run('1,2', {}, operators.divide)
      expect(formula).toEqual('1/2 = 0.5')
      expect(result).toEqual('0.5')
    })
  })
})
