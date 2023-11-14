import type { ActionParams, FilterOperator } from '@rabbitholegg/questdk'
import type { Address, Hash } from 'viem'

export enum Tokens {
  ARB = '0x912CE59144191C1204E64559FE8253a0e49E6548',
  DAI = '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  ETH = '0x0000000000000000000000000000000000000000',
  GMX = '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
  JOE = '0x371c7ec6D8039ff7933a2AA28EB827Ffe1F52f07',
  LINK = '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
  MAGIC = '0x539bdE0d7Dbd336b79148AA742883198BBF60342',
  RDNT = '0x3082CC23568eA640225c2467653dB90e9250AaA0',
  STG = '0x6694340fc020c5E6B96567843da2df01b2CE1eb6',
  USDC = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  USDCE = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  USDT = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  WBTC = '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
  WETH = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
}

interface Transaction {
  chainId: number
  from: Address
  hash?: Hash
  input: string
  to: Address
  value: string
}

export interface TestCase<T extends ActionParams> {
  transaction: Transaction
  params: T
  description: string
}

export type TestParams<T extends ActionParams> = {
  transaction: Transaction
  params: T
}

/**
 * Creates a test case object for a given action and transaction.
 *
 * This function takes a `TestParams` object that includes both a `Transaction` and
 * `ActionParams`, a description of the test case, and an optional set of overrides
 * for the action parameters. It returns a `TestCase` object that contains the transaction,
 * the combined action parameters with any overrides applied, and the description.
 *
 * @param {TestParams<T>} testParams - An object containing the transaction and action parameters.
 * @param {string} description - A brief description of the test case.
 * @param {Partial<T>} [overrides] - Optional overrides for the action parameters.
 * @returns {TestCase<T>} A test case object with the transaction, params, and description.
 */
export function createTestCase<T extends ActionParams>(
  testParams: TestParams<T>,
  description: string,
  overrides: Partial<T> = {},
): TestCase<T> {
  return {
    transaction: testParams.transaction,
    params: { ...testParams.params, ...overrides },
    description,
  }
}

export const buildPathQuery = (tokenIn?: string, tokenOut?: string) => {
  // v2 paths are formatted as [<token>, <token>]
  const conditions: FilterOperator[] = []

  if (tokenIn) {
    conditions.push({ $first: tokenIn })
  }

  if (tokenOut) {
    conditions.push({ $last: tokenOut })
  }

  return {
    $and: conditions,
  }
}
