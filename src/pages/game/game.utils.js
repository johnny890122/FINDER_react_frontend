export const getNodeValue = ({ nodeCount, ranking }) => nodeCount / (10 * ranking)

export const calculateCumulativeSum = ({ data }) => {
  if (!data.length) return []

  const cumulativeData = [data[0]]
  for (let i = 1; i < data.length; i += 1) {
    cumulativeData[i] = cumulativeData[i - 1] + data[i]
  }
  return cumulativeData
}

export const parsePayoffDataForChart = ({ payoffRawData }) => {
  if (!payoffRawData) return []
  const { payoffHuman, payoffFinder, payoffInstantFinder } = payoffRawData

  const payoff = []
  for (let i = 0; i < payoffFinder.length; i += 1) {
    payoff.push({
      name: i + 1,
      payoffHuman: payoffHuman[i] ?? null,
      payoffFinder: payoffFinder[i],
      payoffInstantFinder: payoffInstantFinder[i],
    })
  }

  return payoff
}

export const getNeighborNodeIds = ({ graphData, hoverNodeId }) => {
  const neighborNodeIds = new Set()
  for (let i = 0; i < graphData.links.length; i += 1) {
    const link = graphData.links[i]
    if (link.source.id === hoverNodeId) neighborNodeIds.add(link.target.id)
    if (link.target.id === hoverNodeId) neighborNodeIds.add(link.source.id)
  }
  return [...neighborNodeIds]
}

export const getNeighborLinks = ({ graphData, hoveredNodeId }) => {
  const neighborLinks = new Set()
  for (let i = 0; i < graphData.links.length; i += 1) {
    const link = graphData.links[i]
    if (link.source.id === hoveredNodeId || link.target.id === hoveredNodeId) {
      neighborLinks.add(link)
    }
  }
  return [...neighborLinks]
}

export const getRandomNumber = ({ totalCount, excludeNumbers = [] }) => {
  const numbers = Array.from({ length: totalCount }, (_, i) => i)
  const possibleNumbers = numbers.filter(num => !excludeNumbers.includes(num))

  if (possibleNumbers.length > 0) {
    const randomSeed = Math.floor(Math.random() * possibleNumbers.length)
    return possibleNumbers[randomSeed]
  }
  return 0
}

export const removeNodeAndRelatedLinksFromGraphData = ({ graphData, removedNodeId }) => {
  if (!graphData) return graphData
  if (!removedNodeId) return graphData
  const { nodes, links } = graphData

  const remainNodes = nodes.filter(node => node.id !== removedNodeId)
  const remainLinks = links.filter(link => link.source.id !== removedNodeId && link.target.id !== removedNodeId)

  return { nodes: remainNodes, links: remainLinks }
}

export const deepCloneGraphData = ({ graphData }) => {
  if (!graphData) return {}

  const { nodes, links } = graphData
  if (!nodes || !links) return {}

  const clonedGraphData = { nodes: [], links: [] }
  for (let i = 0; i < nodes.length; i += 1) {
    const { id } = nodes[i]
    clonedGraphData.nodes = [...clonedGraphData.nodes, { id }]
  }
  for (let i = 0; i < links.length; i += 1) {
    const { target: targetId, source: sourceId } = links[i]
    clonedGraphData.links = [...clonedGraphData.links, { target: { id: targetId }, source: { id: sourceId } }]
  }
  return clonedGraphData
}
