import { useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import { API_ROOT } from '../../api.config'
import { getViewport } from '../../utils'
import { selectNetworkCode } from './game.slice'
import { getNodeColorByRanking } from './game.utils'

export const ForceGraph = () => {
  const networkCode = useSelector(selectNetworkCode)
  const { width, height } = getViewport()

  const [toBeRemovedNodeId, setToBeRemovedNodeId] = useState(null)
  const [removedNodeId, setRemovedNodeId] = useState(null)

  const { data: graphData } = useQuery({
    queryKey: ['gameStart'],
    queryFn: async () => {
      const response = await fetch(`${API_ROOT}/game_start/?chosen_network_id=${networkCode}`, {
        method: 'GET',
      })
      if (!response.ok) {
        throw new Error('Failed to start a game')
      }
      return response.json()
    },
  })

  const handleClickNode = node => {
    if (node.id === toBeRemovedNodeId) {
      setRemovedNodeId(node.id)
      setToBeRemovedNodeId(null)
    } else {
      setToBeRemovedNodeId(node.id)
    }
  }

  const ranking = graphData
    ? graphData.nodes.reduce(
        (previous, current) => ({ ...previous, [current.id]: Math.floor(Math.random() * 8) + 1 }),
        {},
      )
    : {}

  if (!graphData) {
    return 'loading'
  }

  return (
    <ForceGraph2D
      graphData={graphData}
      nodeVisibility={node => node.id !== removedNodeId}
      linkVisibility={link => link.source.id !== removedNodeId && link.target.id !== removedNodeId}
      nodeColor={node => {
        if (node.id === toBeRemovedNodeId) return '#311B92'
        if (toBeRemovedNodeId) return '#EDE7F6'
        return getNodeColorByRanking({ ranking: ranking[node.id] })
      }}
      onNodeClick={handleClickNode}
      width={width - 8 * 14}
      height={height - 8 * 14}
    />
  )
}
