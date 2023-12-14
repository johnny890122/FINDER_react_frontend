import { useState } from 'react'
import { useSelector } from 'react-redux'
import ForceGraph2D from 'react-force-graph-2d'
import PropTypes from 'prop-types'

import { getViewport } from '../../utils'
import { color } from '../../styles'
import { getNodeValue } from './game.utils'
import { selectGraphRanking } from './game.slice'

export const ForceGraph = ({ graphData = { nodes: [], links: [] }, onRemoveNode = () => {} }) => {
  const { width, height } = getViewport()
  const graphRanking = useSelector(selectGraphRanking)

  const [toBeRemovedNodeId, setToBeRemovedNodeId] = useState(null)
  const [removedNodeId, setRemovedNodeId] = useState(null)

  const handleClickNode = node => {
    if (!graphRanking) return
    if (node.id === toBeRemovedNodeId) {
      setRemovedNodeId(node.id)
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
      nodeVisibility={node => node.id !== removedNodeId}
      linkVisibility={link => link.source.id !== removedNodeId && link.target.id !== removedNodeId}
      nodeVal={node => {
        if (!graphRanking) return 1
        return getNodeValue({ nodeCount: Object.values(graphRanking).length, ranking: graphRanking[node.id] })
      }}
      nodeColor={node => {
        if (node.id === toBeRemovedNodeId) return color.neutralsColor400
        return color.primaryColor600
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
