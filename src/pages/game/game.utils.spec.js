import { getNodeValue, parsePayoffDataForChart } from './game.utils'

describe('getNodeValue', () => {
  it('should get correct node value', () => {
    expect(getNodeValue({ nodeCount: 1, ranking: 1 })).toBe(0.1)
  })
})

describe('parsePayoffDataForChart', () => {
  it('should return empty array if there is no input', () => {
    expect(parsePayoffDataForChart({ payoffRawData: null })).toEqual([])
  })
  it('should combine payoffHuman and payoffFinder in return value', () => {
    const payoffRawData = { payoffHuman: [0.1, 0.2], payoffFinder: [0.3, 0.4] }
    const expectPayoff = [
      { name: 1, payoffHuman: 0.1, payoffFinder: 0.3 },
      { name: 2, payoffHuman: 0.2, payoffFinder: 0.4 },
    ]

    expect(parsePayoffDataForChart({ payoffRawData })).toEqual(expectPayoff)
  })
  it('should fill in null if length of payoffHuman is smaller than length of payoffFinder', () => {
    const payoffRawData = { payoffHuman: [0.1], payoffFinder: [0.3, 0.4] }
    const expectPayoff = [
      { name: 1, payoffHuman: 0.1, payoffFinder: 0.3 },
      { name: 2, payoffHuman: null, payoffFinder: 0.4 },
    ]

    expect(parsePayoffDataForChart({ payoffRawData })).toEqual(expectPayoff)
  })
  it('should cut off the rest of payoffHuman if length of payoffHuman is bigger than length of payoffFinder', () => {
    const payoffRawData = { payoffHuman: [0.1, 0.2], payoffFinder: [0.3] }
    const expectPayoff = [{ name: 1, payoffHuman: 0.1, payoffFinder: 0.3 }]

    expect(parsePayoffDataForChart({ payoffRawData })).toEqual(expectPayoff)
  })
})
