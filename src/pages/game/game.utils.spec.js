import { getNodeValue, parsePayoffDataForChart, getNeighborNodeIds, getNeighborLinks } from './game.utils'

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

describe('getNeighborNodeIds', () => {
  it('should get corrent neighbor node ids array given graphData and hovered node id', () => {
    const graphData = {
      nodes: [{ id: 0 }, { id: 1 }],
      links: [
        {
          source: { id: 0 },
          target: { id: 1 },
        },
        {
          source: { id: 1 },
          target: { id: 0 },
        },
      ],
    }
    const hoverNodeId = 0
    expect(getNeighborNodeIds({ graphData, hoverNodeId })).toEqual([1])
  })
})

describe('getNeighborLinks', () => {
  it('should get correct neighbor links array given graphData and hovered node id', () => {
    const graphData = {
      nodes: [{ id: 0 }, { id: 1 }],
      links: [
        {
          source: { id: 0 },
          target: { id: 1 },
        },
        {
          source: { id: 1 },
          target: { id: 0 },
        },
      ],
    }
    const hoveredNodeId = 0
    expect(getNeighborLinks({ graphData, hoveredNodeId })).toEqual([
      {
        source: { id: 0 },
        target: { id: 1 },
      },
      {
        source: { id: 1 },
        target: { id: 0 },
      },
    ])
  })
})
