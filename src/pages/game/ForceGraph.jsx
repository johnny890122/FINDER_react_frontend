import { useState } from 'react'
import { useSelector } from 'react-redux'
import ForceGraph2D from 'react-force-graph-2d'
import PropTypes from 'prop-types'

import { getViewport } from '../../utils'
import { color } from '../../styles'
import { getNodeValue } from './game.utils'
import { selectGraphRanking, selectSelectedTool, selectRound } from './game.slice'

export const ForceGraph = ({ graphData = { nodes: [], links: [] }, onRemoveNode = () => {} }) => {
  const { width, height } = getViewport()
  const graphRanking = useSelector(selectGraphRanking)
  const selectedTool = useSelector(selectSelectedTool)
  const round = useSelector(selectRound)

  const [toBeRemovedNodeId, setToBeRemovedNodeId] = useState(null)
  const [removedNodeIds, setRemovedNodeIds] = useState([])

  const handleClickNode = node => {
    if (!graphRanking) return
    if (node.id === toBeRemovedNodeId) {
      setRemovedNodeIds([...removedNodeIds, node.id])
      setToBeRemovedNodeId(null)
      onRemoveNode()
    } else {
      setToBeRemovedNodeId(node.id)
    }
  }

  if (!graphData) {
    return 'loading'
  }

  return (
    <ForceGraph2D
      graphData={graphData}
      nodeVisibility={node => !removedNodeIds.includes(node.id)}
      linkVisibility={link => !removedNodeIds.includes(link.source.id) && !removedNodeIds.includes(link.target.id)}
      nodeVal={node => {
        if (!graphRanking) return 1
        return getNodeValue({ nodeCount: Object.values(graphRanking).length, ranking: graphRanking[node.id] })
      }}
      nodeColor={node => {
        if (node.id === toBeRemovedNodeId) return color.neutralsColor400
        return color.primaryColor600
      }}
      nodeLabel={node => {
        if (!graphRanking || selectedTool.length < round) return `#${node.id}`
        return `#${node.id}，${selectedTool[round - 1].displayName}排名第 ${graphRanking[node.id]}`
      }}
      onNodeClick={handleClickNode}
      width={width - 8 * 14 - 470}
      height={height - 8 * 14}
    />
  )
}

ForceGraph.propTypes = {
  graphData: PropTypes.object.isRequired,
  onRemoveNode: PropTypes.func.isRequired,
}
