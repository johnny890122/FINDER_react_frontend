import { useState } from 'react'
import { useSelector } from 'react-redux'
import ForceGraph2D from 'react-force-graph-2d'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { getViewport } from '../../utils'
import { color } from '../../styles'
import { getNodeValue } from './game.utils'
import { selectGraphRanking, selectSelectedTool, selectRound } from './game.slice'

export const ForceGraph = ({ graphData = { nodes: [], links: [] }, onRemoveNode = () => {}, width, height }) => {
  const { width: viewportWidth, height: viewportHeight } = getViewport()
  const graphRanking = useSelector(selectGraphRanking)
  const selectedTool = useSelector(selectSelectedTool)
  const round = useSelector(selectRound)

  const [toBeRemovedNodeId, setToBeRemovedNodeId] = useState(null)
  const [removedNodeIds, setRemovedNodeIds] = useState([])

  const graphWidth = width || (viewportWidth > 768 ? viewportWidth - 8 * 14 - 470 : viewportWidth - 28)
  const graphHeight = height || (viewportWidth > 768 ? viewportHeight - 8 * 14 : viewportHeight - 12 * 14)

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
    <StyledForceGraphContainer width={graphWidth} height={graphHeight}>
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
          return `#${node.id}，${selectedTool[selectedTool.length - 1].displayName}排名第 ${graphRanking[node.id]}`
        }}
        onNodeClick={handleClickNode}
        width={graphWidth}
        height={graphHeight}
      />
    </StyledForceGraphContainer>
  )
}

ForceGraph.propTypes = {
  graphData: PropTypes.object.isRequired,
  onRemoveNode: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
}
ForceGraph.defaultProps = {
  width: 0,
  height: 0,
}

const StyledForceGraphContainer = styled.div`
  border: 1px solid ${color.primaryColor400};
  width: ${props => props.width};
  height: ${props => props.height};
`
