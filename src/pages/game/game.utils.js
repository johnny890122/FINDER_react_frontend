export const getNodeValue = ({ nodeCount, ranking }) => nodeCount / (10 * ranking)

export const parsePayoffDataForChart = ({ payoffRawData }) => {
  if (!payoffRawData) return []
  const { payoffHuman, payoffFinder } = payoffRawData
  const payoff = []
  for (let i = 0; i < payoffFinder.length; i += 1) {
    payoff.push({ name: i + 1, payoffHuman: payoffHuman[i] ?? null, payoffFinder: payoffFinder[i] })
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
