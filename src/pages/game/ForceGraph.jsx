import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import ForceGraph2D from 'react-force-graph-2d'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonGroup } from '@mui/material'

import { getViewport } from '../../utils'
import { Button } from '../../components'
import { color } from '../../styles'
import { getNodeValue } from './game.utils'
import { selectGraphRanking } from './game.slice'

export const ForceGraph = ({
  isDemoGraph = false,
  graphData,
  selectedTool,
  removedNodeIds,
  setRemovedNodeIds,
  setIsReadyGetPayoff,
  onRemoveNode,
  width,
  height,
}) => {
  const graphRef = useRef(null)
  const { width: viewportWidth, height: viewportHeight } = getViewport()
  const graphRanking = useSelector(selectGraphRanking)

  const [toBeRemovedNodeId, setToBeRemovedNodeId] = useState(null)
  const [zoomPan, setZoomPan] = useState({ k: 1, x: 0, y: 0 })

  const graphWidth = width || (viewportWidth > 768 ? viewportWidth - 8 * 14 - 470 : viewportWidth - 28)
  const graphHeight = height || (viewportWidth > 768 ? viewportHeight - 8 * 14 : viewportHeight - 12 * 14)

  const handleClickNode = node => {
    if (!graphRanking) return
    if (node.id === toBeRemovedNodeId) {
      setRemovedNodeIds([...removedNodeIds, node.id])
      setToBeRemovedNodeId(null)
      setIsReadyGetPayoff(true)
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
        ref={graphRef}
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
        onZoomEnd={({ k }) => {
          if (k !== zoomPan.k) {
            setZoomPan(k)
          }
        }}
      />
      <StyledButtonGroupContainer>
        <StyledButtonGroup>
          <Button level="secondary" onClick={() => graphRef.current.zoom(zoomPan * 0.75, 250)}>
            {' '}
            -{' '}
          </Button>
          <Button level="secondary" onClick={() => graphRef.current.zoom(zoomPan * 1.5, 250)}>
            {' '}
            +{' '}
          </Button>
        </StyledButtonGroup>
      </StyledButtonGroupContainer>
    </StyledForceGraphContainer>
  )
}

ForceGraph.propTypes = {
  isDemoGraph: PropTypes.bool,
  graphData: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null, undefined])]).isRequired,
  selectedTool: PropTypes.object,
  removedNodeIds: PropTypes.array,
  setRemovedNodeIds: PropTypes.func,
  setIsReadyGetPayoff: PropTypes.func,
  onRemoveNode: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
}
ForceGraph.defaultProps = {
  isDemoGraph: false,
  selectedTool: {},
  onRemoveNode: () => {},
  removedNodeIds: [],
  setRemovedNodeIds: () => {},
  setIsReadyGetPayoff: () => {},
  width: 0,
  height: 0,
}

const StyledForceGraphContainer = styled.div`
  position: relative;
  border: 1px solid ${color.primaryColor400};
  width: ${props => props.width};
  height: ${props => props.height};
`
const StyledButtonGroupContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`
const StyledButtonGroup = styled(ButtonGroup)`
  &.MuiButtonGroup-root {
    box-shadow: none;
  }
  & .MuiButtonGroup-firstButton {
    border: 1px solid ${color.primaryColor500};
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
  & .MuiButtonGroup-lastButton {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
`
