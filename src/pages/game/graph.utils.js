export const generateRandomTree = (N = 300, reverse = false) => ({
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
})
