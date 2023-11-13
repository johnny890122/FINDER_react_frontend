import { useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'

function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map(i => ({
      id: i,
      name: '連結程度排名第 x 高',
    })),
    links: [...Array(N).keys()]
      .filter(id => id)
      .map(id => ({
        [reverse ? 'target' : 'source']: id,
        [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1)),
      })),
  }
}

const data = genRandomTree(5)

export const ForceGraph = () => {
  const [toBeRemovedNodeId, setToBeRemovedNodeId] = useState(null)
  const [removedNodeId, setRemovedNodeId] = useState(null)

  const handleClickNode = node => {
    if (node.id === toBeRemovedNodeId) {
      setRemovedNodeId(node.id)
    } else {
      setToBeRemovedNodeId(node.id)
    }
  }

  return (
    <ForceGraph2D
      graphData={data}
      nodeVisibility={node => node.id !== removedNodeId}
      linkVisibility={link => link.source.id !== removedNodeId && link.target.id !== removedNodeId}
      nodeColor={node => (node.id === toBeRemovedNodeId ? 'red' : 'blue')}
      onNodeClick={handleClickNode}
    />
  )
}
