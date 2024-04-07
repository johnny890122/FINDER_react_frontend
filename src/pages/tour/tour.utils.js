import tourHDA from '../../assets/tour-hda.PNG'
import tourHCA from '../../assets/tour-hca.PNG'
import tourHBA from '../../assets/tour-hba.PNG'
import tourHPRA from '../../assets/tour-hpra.PNG'

export const getToolImage = ({ toolName }) => {
  if (toolName === '連結程度') return tourHDA
  if (toolName === '距離長短') return tourHCA
  if (toolName === '中介程度') return tourHBA
  if (toolName === '重要程度') return tourHPRA
  return null
}

export const filterDisabledNodeIds = ({ graphData, nodeIdToBeRemoved }) => {
  if (!graphData || !nodeIdToBeRemoved) return []
  return graphData.nodes.filter(node => node.id !== nodeIdToBeRemoved).map(node => node.id)
}
