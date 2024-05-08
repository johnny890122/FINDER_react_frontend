import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ForceGraph2D from 'react-force-graph-2d'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonGroup } from '@mui/material'
import { LibraryAddCheckOutlined } from '@mui/icons-material'

import { getViewport } from '../../utils'
import { Button, Progress } from '../../components'
import { color } from '../../styles'
import { getNodeValue, getNeighborNodeIds, getNeighborLinks, deepCloneGraphData } from './game.utils'
import { selectGraphRanking, updateRealGraphData } from './game.slice'

export const ForceGraph = ({
  withAction = true,
  loading,
  graphData,
  selectedTool,
  disabledNodeIds,
  removedNodeIds,
  setRemovedNodeIds,
  setIsReadyGetPayoff,
  setIsPayoffLoading,
  onNodeRemoved,
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
    if (disabledNodeIds.includes(node.id)) return
    if (!withAction) return
    setIsPayoffLoading(true)
    setRemovedNodeIds([...removedNodeIds, node.id])
    setHoveredNode(null)
    setIsReadyGetPayoff(true)
    setNeighborLinks([])
    setNeighborNodeIds([])
    onNodeRemoved()
  }

  useEffect(() => {
    if (graphData) {
      dispatch(updateRealGraphData(deepCloneGraphData({ graphData })))
    }
  }, [graphData])

  if (!selectedTool) {
    return (
      <StyledForceGraphContainer width={graphWidth} height={graphHeight}>
        <StyledWarningContainer>
          <LibraryAddCheckOutlined />
          <p>請選擇輔助指標</p>
        </StyledWarningContainer>
      </StyledForceGraphContainer>
    )
  }

  if (loading) {
    return (
      <StyledForceGraphContainer width={graphWidth} height={graphHeight}>
        <Progress />
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
          if (!graphRanking || !Object.keys(graphRanking).length) return `#${node.id}`
          return `#${node.id}，${selectedTool.displayName}排名第 ${graphRanking[node.id]}`
        }}
        width={graphWidth}
        height={graphHeight}
        onZoomEnd={({ k }) => {
          if (k !== zoomPan.k) {
            setZoomPan(k)
          }
        }}
        minZoom={1}
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
  loading: PropTypes.bool,
  graphData: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null, undefined])]),
  selectedTool: PropTypes.object,
  disabledNodeIds: PropTypes.array,
  removedNodeIds: PropTypes.array,
  setRemovedNodeIds: PropTypes.func,
  setIsReadyGetPayoff: PropTypes.func,
  setIsPayoffLoading: PropTypes.func,
  onNodeRemoved: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
}
ForceGraph.defaultProps = {
  withAction: true,
  loading: false,
  graphData: null,
  selectedTool: {},
  disabledNodeIds: [],
  removedNodeIds: [],
  setRemovedNodeIds: () => {},
  setIsReadyGetPayoff: () => {},
  setIsPayoffLoading: () => {},
  onNodeRemoved: () => {},
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
const StyledWarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 1.25rem;
    margin: 0.5rem 0;
  }
  & .MuiSvgIcon-root {
    height: 2rem;
    width: 2rem;
    color: ${color.primaryColor300};
  }
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
