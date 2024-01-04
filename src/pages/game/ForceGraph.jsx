import { useState } from 'react'
import { useSelector } from 'react-redux'
import ForceGraph2D from 'react-force-graph-2d'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { getViewport } from '../../utils'
import { color } from '../../styles'
import { getNodeValue } from './game.utils'
import { selectGraphRanking } from './game.slice'

export const ForceGraph = ({
  isDemoGraph = false,
  graphData = { nodes: [], links: [] },
  selectedTool,
  onRemoveNode = () => {},
  width,
  height,
}) => {
  const { width: viewportWidth, height: viewportHeight } = getViewport()
  const graphRanking = useSelector(selectGraphRanking)

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

  if (isDemoGraph) {
    return (
      <StyledForceGraphContainer width={graphWidth} height={graphHeight}>
        <ForceGraph2D
          graphData={graphData}
          nodeVal={node => {
            if (!graphRanking) return 1
            return getNodeValue({ nodeCount: Object.values(graphRanking).length, ranking: graphRanking[node.id] })
          }}
          nodeColor={() => color.primaryColor600}
          nodeLabel={node => {
            if (!graphRanking) return `#${node.id}`
            return `#${node.id}，${selectedTool.displayName}排名第 ${graphRanking[node.id]}`
          }}
          width={graphWidth}
          height={graphHeight}
        />
      </StyledForceGraphContainer>
    )
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
          if (!graphRanking) return `#${node.id}`
          return `#${node.id}，${selectedTool.displayName}排名第 ${graphRanking[node.id]}`
        }}
        onNodeClick={handleClickNode}
        width={graphWidth}
        height={graphHeight}
      />
    </StyledForceGraphContainer>
  )
}

ForceGraph.propTypes = {
  isDemoGraph: PropTypes.bool,
  graphData: PropTypes.object.isRequired,
  selectedTool: PropTypes.object.isRequired,
  onRemoveNode: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
}
ForceGraph.defaultProps = {
  isDemoGraph: false,
  width: 0,
  height: 0,
}

const StyledForceGraphContainer = styled.div`
  border: 1px solid ${color.primaryColor400};
  width: ${props => props.width};
  height: ${props => props.height};
`
