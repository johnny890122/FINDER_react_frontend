/* eslint-disable react/forbid-prop-types */
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ForceGraph2D from 'react-force-graph-2d'
import PropTypes from 'prop-types'

import { getViewport } from '../../utils'
import { getNodeColorByRanking } from './game.utils'
import { selectGraphRanking } from './game.slice'

export const ForceGraph = ({ graphData = { nodes: [], links: [] }, onRemoveNode = () => {} }) => {
  const { width, height } = getViewport()
  const graphRanking = useSelector(selectGraphRanking)

  const [toBeRemovedNodeId, setToBeRemovedNodeId] = useState(null)
  const [removedNodeId, setRemovedNodeId] = useState(null)

  const handleClickNode = node => {
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
      nodeColor={node => {
        if (!graphRanking) return '#311B92'
        if (node.id === toBeRemovedNodeId) return '#311B92'
        if (toBeRemovedNodeId) return '#EDE7F6'
        return getNodeColorByRanking({ ranking: graphRanking[node.id] })
      }}
      onNodeClick={handleClickNode}
      width={width - 8 * 14}
      height={height - 8 * 14}
    />
  )
}

ForceGraph.propTypes = {
  graphData: PropTypes.object.isRequired,
  onRemoveNode: PropTypes.func.isRequired,
}
