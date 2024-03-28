import {
  getNodeValue,
  calculateCumulativeSum,
  concatPayoffFinderWithCumulativePayoffHuman,
  parsePayoffDataForChart,
  getNeighborNodeIds,
  getNeighborLinks,
  getRandomNumber,
  removeNodeAndRelatedLinksFromGraphData,
  deepCloneGraphData,
} from './game.utils'

describe('getNodeValue', () => {
  it('should get correct node value', () => {
    expect(getNodeValue({ nodeCount: 1, ranking: 1 })).toBe(0.1)
  })
})

describe('calculateCumulativeSum', () => {
  it('given empty array, return empty array', () => {
    expect(calculateCumulativeSum({ data: [] })).toEqual([])
  })
  it('given non-empty array, calculate cumulative sum', () => {
    const data = [1, 2, 3]
    const expectedResult = [1, 3, 6]
    expect(calculateCumulativeSum({ data })).toEqual(expectedResult)
  })
})

describe('concatPayoffFinderWithCumulativePayoffHuman', () => {
  it('should concat payoff finder with cumulative payoff human', () => {
    const cumulativePayoffHuman = [1, 3, 5]
    const payoffFinder = [6, 7, 8]
    expect(concatPayoffFinderWithCumulativePayoffHuman({ cumulativePayoffHuman, payoffFinder })).toEqual([
      1, 3, 6, 7, 8,
    ])
  })
})

describe('parsePayoffDataForChart', () => {
  it('should return empty array if there is no input', () => {
    expect(parsePayoffDataForChart({ payoffRawData: null })).toEqual([])
  })
  it('should combine payoffHuman and payoffFinder in return value', () => {
    const payoffRawData = { payoffHuman: [1, 2, 3], payoffFinder: [7, 8, 9] }
    const expectPayoff = [
      { name: 1, payoffHuman: 1, payoffFinder: 1 },
      { name: 2, payoffHuman: 3, payoffFinder: 3 },
      { name: 3, payoffHuman: 6, payoffFinder: 7 },
      { name: 4, payoffHuman: null, payoffFinder: 8 },
      { name: 5, payoffHuman: null, payoffFinder: 9 },
    ]

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

describe('getRandomNumber', () => {
  it('should get random number between 0 and total count', () => {
    expect(getRandomNumber({ totalCount: 5 })).toBeLessThanOrEqual(4)
    expect(getRandomNumber({ totalCount: 5 })).toBeGreaterThanOrEqual(0)
  })
  it('should not be exclude numbers', () => {
    expect(getRandomNumber({ totalCount: 2, excludeNumbers: [0] })).not.toBe(0)
  })
  it('should return 0 if all numbers are excluded', () => {
    expect(getRandomNumber({ totalCount: 2, excludeNumbers: [0, 1] })).toBe(0)
  })
})

describe('removeNodeAndRelatedLinksFromGraphData', () => {
  const graphData = {
    nodes: [{ id: 0 }, { id: 1 }, { id: 2 }],
    links: [
      {
        source: { id: 0 },
        target: { id: 1 },
      },
      {
        source: { id: 1 },
        target: { id: 0 },
      },
      {
        source: { id: 1 },
        target: { id: 2 },
      },
    ],
  }
  it('no removedNode, should return original graphData', () => {
    expect(removeNodeAndRelatedLinksFromGraphData({ graphData, removedNodeId: null })).toEqual(graphData)
  })
  it('should return graphData with node and related links removed', () => {
    const removedNodeId = 2
    const expectReturnGraphData = {
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

    expect(removeNodeAndRelatedLinksFromGraphData({ graphData, removedNodeId })).toEqual(expectReturnGraphData)
  })
})

describe('deepCloneGraphData', () => {
  it('if no graphData, should return empty object', () => {
    expect(deepCloneGraphData({ graphData: null })).toEqual({})
  })
  it('if no nodes and links in graphData, return empty object', () => {
    expect(deepCloneGraphData({ graphData: {} })).toEqual({})
  })
  it('should deep clone given graphData with correct format', () => {
    const graphData = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }],
      links: [
        { source: 0, target: 1 },
        { source: 0, target: 2 },
      ],
    }
    const expectClonedGraphData = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }],
      links: [
        { source: { id: 0 }, target: { id: 1 } },
        { source: { id: 0 }, target: { id: 2 } },
      ],
    }
    expect(deepCloneGraphData({ graphData })).toEqual(expectClonedGraphData)
  })
})
