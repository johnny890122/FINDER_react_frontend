import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ForceGraph2D from 'react-force-graph-2d'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonGroup } from '@mui/material'

import { getViewport } from '../../utils'
import { Button, Progress } from '../../components'
import { color } from '../../styles'
import { getNodeValue, getNeighborNodeIds, getNeighborLinks, deepCloneGraphData } from './game.utils'
import { selectGraphRanking, updateRealGraphData } from './game.slice'

export const ForceGraph = ({
  withAction = true,
  withPayoff = true,
  loading,
  graphData,
  selectedTool,
  removedNodeIds,
  setRemovedNodeIds,
  setIsReadyGetPayoff,
  width,
  height,
}) => {
  const graphRef = useRef(null)
  const dispatch = useDispatch()
  const { width: viewportWidth, height: viewportHeight } = getViewport()
  const graphRanking = useSelector(selectGraphRanking)

  const [hoveredNode, setHoveredNode] = useState(null)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [neighborNodeIds, setNeighborNodeIds] = useState([])
  const [neighborLinks, setNeighborLinks] = useState([])
  const [zoomPan, setZoomPan] = useState({ k: 1, x: 0, y: 0 })

  const graphWidth = width || (viewportWidth > 768 ? viewportWidth - 8 * 14 - 470 : viewportWidth - 28)
  const graphHeight = height || (viewportWidth > 768 ? viewportHeight - 8 * 14 : viewportHeight - 12 * 14)

  const handleNodeHover = node => {
    setHoveredNode(node || null)

    if (node) {
      setNeighborNodeIds(getNeighborNodeIds({ graphData, hoverNodeId: node.id }))
      setNeighborLinks(getNeighborLinks({ graphData, hoveredNodeId: node.id }))
    } else {
      setNeighborNodeIds([])
      setNeighborLinks([])
    }
  }

  const handleLinkHover = link => {
    if (link) {
      setHoveredLink(link)
    } else {
      setHoveredLink(null)
    }
  }

  const handleNodeClick = node => {
    setRemovedNodeIds([...removedNodeIds, node.id])
    setHoveredNode(null)
    setIsReadyGetPayoff(true)
  }

  useEffect(() => {
    if (graphData && withAction && withPayoff) {
      dispatch(updateRealGraphData(deepCloneGraphData({ graphData })))
    }
  }, [graphData])

  if (loading || !graphData) {
    return (
      <StyledForceGraphContainer width={graphWidth} height={graphHeight}>
        <Progress />
      </StyledForceGraphContainer>
    )
  }

  if (!withAction) {
    return (
      <StyledForceGraphContainer width={graphWidth} height={graphHeight}>
        <ForceGraph2D
          graphData={graphData}
          nodeVal={node => {
            if (!graphRanking) return 1
            return getNodeValue({ nodeCount: Object.values(graphRanking).length, ranking: graphRanking[node.id] })
          }}
          nodeColor={() => color.primaryColor300}
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
        nodeRelSize={8}
        nodeVal={node => {
          if (!graphRanking) return 1
          return getNodeValue({ nodeCount: Object.values(graphRanking).length, ranking: graphRanking[node.id] })
        }}
        nodeColor={node => {
          if (hoveredNode?.id === node.id) return color.primaryColor600
          if (neighborNodeIds.includes(node.id)) return color.neutralsColor700
          return color.primaryColor300
        }}
        nodeLabel={node => {
          if (!graphRanking) return `#${node.id}`
          return `#${node.id}，${selectedTool.displayName}排名第 ${graphRanking[node.id]}`
        }}
        width={graphWidth}
        height={graphHeight}
        onZoomEnd={({ k }) => {
          if (k !== zoomPan.k) {
            setZoomPan(k)
          }
        }}
        linkWidth={link => (hoveredLink === link || neighborLinks.includes(link) ? 5 : 1)}
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={link => (hoveredLink === link || neighborLinks.includes(link) ? 4 : 0)}
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
        onNodeClick={handleNodeClick}
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
  withAction: PropTypes.bool,
  withPayoff: PropTypes.bool,
  loading: PropTypes.bool,
  graphData: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null, undefined])]).isRequired,
  selectedTool: PropTypes.object,
  removedNodeIds: PropTypes.array,
  setRemovedNodeIds: PropTypes.func,
  setIsReadyGetPayoff: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
}
ForceGraph.defaultProps = {
  withAction: true,
  withPayoff: true,
  loading: false,
  selectedTool: {},
  removedNodeIds: [],
  setRemovedNodeIds: () => {},
  setIsReadyGetPayoff: () => {},
  width: 0,
  height: 0,
}

const StyledForceGraphContainer = styled.div`
  position: relative;
  border: 1px solid ${color.primaryColor400};
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
