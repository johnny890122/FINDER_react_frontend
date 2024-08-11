import {
  getNodeValue,
  parsePayoffDataForChart,
  getNeighborNodeIds,
  getNeighborLinks,
  getRandomNumber,
  removeNodeAndRelatedLinksFromGraphData,
  deepCloneGraphData,
  determineForceGraphHint,
} from './game.utils'

describe('getNodeValue', () => {
  it('should get correct node value', () => {
    expect(getNodeValue({ nodeCount: 1, ranking: 1 })).toBe(0.1)
  })
})

describe('parsePayoffDataForChart', () => {
  it('should return empty array if there is no input', () => {
    expect(parsePayoffDataForChart({ payoffRawData: null })).toEqual([])
  })
  it('should return data with payoffHuman, payoffFinder, and payoffInstantFinder', () => {
    const payoffRawData = {
      payoffHuman: [1, 2, 3],
      payoffFinder: [7, 8, 9],
      payoffInstantFinder: [4, 5, 6],
    }
    const expectPayoff = [
      { name: 1, payoffHuman: 1, payoffFinder: 7, payoffInstantFinder: 4 },
      { name: 2, payoffHuman: 2, payoffFinder: 8, payoffInstantFinder: 5 },
      { name: 3, payoffHuman: 3, payoffFinder: 9, payoffInstantFinder: 6 },
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

describe('determineForceGraphHint', () => {
  it('if status is "READY_FOR_SELECT_TOOL", return "請選擇輔助工具"', () => {
    expect(determineForceGraphHint({ stepStatus: 'READY_FOR_SELECT_TOOL' })).toBe('請選擇輔助工具')
  })
  it('if status is "READY_FOR_NEXT_ROUND" and round is 1, return "請開始遊戲"', () => {
    expect(determineForceGraphHint({ stepStatus: 'READY_FOR_NEXT_ROUND', round: 1 })).toBe('請開始遊戲')
  })
  it('if status is "READY_FOR_NEXT_ROUND", return "請查看您本回合的分數"', () => {
    expect(determineForceGraphHint({ stepStatus: 'READY_FOR_NEXT_ROUND' })).toBe('請查看您本回合的分數')
  })
  it('if node ranking or payoff loading, return "請稍等計算該指標的排名"', () => {
    expect(determineForceGraphHint({ isNodeRankingOrPayoffLoading: true })).toBe('請稍等計算該指標的排名')
  })
  it('if node ranking or payoff not loading, return "現在您可以檢選要移除的節點（人物）了"', () => {
    expect(determineForceGraphHint({ isNodeRankingOrPayoffLoading: false })).toBe(
      '現在您可以檢選要移除的節點（人物）了',
    )
  })
})
