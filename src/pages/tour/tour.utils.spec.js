import { filterDisabledNodeIds } from './tour.utils'

describe('filterDisabledNodeIds', () => {
  it('if graph data is null, should return empty array', () => {
    const graphData = null
    const nodeIdToBeRemoved = '1'
    expect(filterDisabledNodeIds({ graphData, nodeIdToBeRemoved })).toEqual([])
  })
  it('if node id is null, should return empty array', () => {
    const graphData = {
      nodes: [{ id: '1' }, { id: '2' }, { id: '3' }],
    }
    const nodeIdToBeRemoved = null
    expect(filterDisabledNodeIds({ graphData, nodeIdToBeRemoved })).toEqual([])
  })
  it('given graph data, should return disabled node ids', () => {
    const graphData = {
      nodes: [{ id: '1' }, { id: '2' }, { id: '3' }],
    }
    const nodeIdToBeRemoved = '3'
    expect(filterDisabledNodeIds({ graphData, nodeIdToBeRemoved })).toEqual(['1', '2'])
  })
})
