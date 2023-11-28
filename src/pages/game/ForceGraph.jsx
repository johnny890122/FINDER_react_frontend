import { useState, useEffect } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { useMachine } from '@xstate/react'
import axios from 'axios'

import { gameMachine, GameStages } from './gameMachine'
import { generateRandomTree } from './graph.utils'

export const ForceGraph = () => {
  const [state, send] = useMachine(gameMachine)
  const [toBeRemovedNodeId, setToBeRemovedNodeId] = useState(null)
  const [removedNodeId, setRemovedNodeId] = useState(null)

  // Post 的地方要改成用 axios，才可以成功呼叫到 api
  const [testG, setTestG] = useState(null)
  useEffect(() => {
      axios.get("http://localhost:8000/game_start/", {
        params: { chosen_network_id: '1' },
      })
      .then(response => {
        setTestG(response.data)
        console.log(response.data)
      })
  }, [])

  // BUG: remove this
  useEffect(() => {
    send('START_GAME', { graph: generateRandomTree(5) })
    // send('START_GAME', { graph: testG })
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
