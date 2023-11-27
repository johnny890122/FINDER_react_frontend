import { useState, useEffect } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { useMachine } from '@xstate/react'

import { gameMachine, GameStages } from './gameMachine'
import { generateRandomTree } from './graph.utils'

export const ForceGraph = () => {
  const [state, send] = useMachine(gameMachine)
  const [toBeRemovedNodeId, setToBeRemovedNodeId] = useState(null)
  const [removedNodeId, setRemovedNodeId] = useState(null)

  // BUG: remove this
  useEffect(() => {
    send('START_GAME', { graph: generateRandomTree(5) })
  }, [])

  const handleClickNode = node => {
    if (node.id === toBeRemovedNodeId) {
      setRemovedNodeId(node.id)
    } else {
      setToBeRemovedNodeId(node.id)
    }
  }

  if (state.context.stage !== GameStages.GRAPH || !state.context.graph) {
    return 'loading'
  }

  return (
    <ForceGraph2D
      graphData={state.context.graph}
      nodeVisibility={node => node.id !== removedNodeId}
      linkVisibility={link => link.source.id !== removedNodeId && link.target.id !== removedNodeId}
      nodeColor={node => (node.id === toBeRemovedNodeId ? 'red' : 'blue')}
      onNodeClick={handleClickNode}
    />
  )
}
