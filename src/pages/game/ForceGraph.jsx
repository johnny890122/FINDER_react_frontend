import { useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import { API_ROOT } from '../../api.config'
import { selectNetworkCode } from './game.slice'

export const ForceGraph = () => {
  const networkCode = useSelector(selectNetworkCode)
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
      nodeColor={node => (node.id === toBeRemovedNodeId ? 'red' : 'blue')}
      onNodeClick={handleClickNode}
    />
  )
}
