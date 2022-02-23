# Challenge Calculator

## Setup

This set up must be done first before using and before testing the project.

1. Install NodeJS: https://nodejs.org/en/
2. Open a terminal and navigate to the project directory.
3. Run the command `npm install`
4. Run the command `npm run build`
5. Run the command `npm link`

## Usage

1. Open a terminal.
2. Run the command `challenge-calculator`
3. Use Ctrl+C to exit.

## Run Automated Tests

NOTE: I noticed between step 2 and 3 that my terminal tests were
randomly unsuccessful based on which terminal was being used. As a
result I removed terminal tests and kept other unit tests.

1. Open a terminal and navigate to the project directory.
2. Run the command `npm test`

## Requirements

### Step 1

- [X] Support a maximum of 2 numbers using a comma delimiter.
- [X] Throw an exception when more than 2 numbers are provided.

**Examples**

- [X] `20` will return `20`.
- [X] `1,5000` will return `5001`.
- [X] `4,-3` will return `1`.
- [X] Empty input should be converted to `0`.
- [X] Missing numbers should be converted to `0`.
- [X] Invalid numbers should be converted to `0` e.g. `5,tytyt` will return `5`.

### Step 2

- [X] Remove the maximum constraint for numbers e.g. `1,2,3,4,5,6,7,8,9,10,11,12` will return `78`.

### Step 3

- [X] Support a newline character as an alternative delimiter e.g. `1\n2,3` will return `6`.

### Step 4

- [X] Deny negative numbers by throwing an exception that includes all the negative numbers provided.

### Step 5

- [X] Make any value greater than 1000 an invalid number e.g. `2,1001,6` will return `8`

### Step 6

- [X] Support 1 custom delimiter of a single character using the format: `//{delimiter}\n{numbers}`.
- [X] All previous formats should also be supported.

**Examples**
 
- [X] `//#\n2#5` will return `7`
- [X] `//,\n2,ff,100` will return `102`

### Step 7

- [X] Support 1 custom delimiter of any length using the format `//[{delimiter}]\n{numbers}`.
- [X] All previous formats should also be supported.

**Examples**

- [X] `//[***]\n11***22***33` will return `66`.

### Step 8

- [X] Support multiple delimiters of any length using the format: `//[{delimiter1}][{delimiter2}]...\n{numbers}`
- [X] All previous formats should also be supported

**Examples** 

- [X] `//[*][!!][r9r]\n11r9r22*hh*33!!44` will return `110`.

## Stretch goals

- [ ] Display the formula used to calculate the result e.g. `2,,4,rrrr,1001,6` will return `2+0+4+0+0+6 = 12`.
- [X] Allow the application to process entered entries until Ctrl+C is used.
- [X] Allow the acceptance of argument to define alternate delimiter in step #3.
- [X] Allow the acceptance of argument to define whether to deny negative numbers in step #4.
- [X] Allow the acceptance of argument to define upper bound in step #5.
- [ ] Use dependency injection.
- [ ] Support subtraction, multiplication, and division operations.
